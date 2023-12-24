import express, { Request, Response } from 'express';

type Price = {
  symbol: string;
  bidPrice: string;
  askPrice: string;
};

type PriceAccumulator = {
  [symbol: string]: number;
};

const DEFAULT_COMMISSION = 0.01;
const DEFAULT_PORT = 3000;
const DEFAULT_UPDATE_INTERVAL = 10;
const ONE = 1;
const TWO = 2;
const SECOND = 1000;
const INTERNAL_SERVER_EXCEPTION_STATUS_CODE = 500;

const CURRENCIES = [
  'BTCUSDT',
  'BTCTUSD',
  'BTCPAX',
  'BTCUSDC',
  'BTCUSDS',
  'BTCBBTC',
  'BTCBUSD',
  'BTCNGN',
  'BTCRUB',
  'BTCTRY',
  'BTCEUR',
  'BTCZAR',
  'BTCBKRW',
  'BTCIDRT',
  'BTCUPUSDT',
  'BTCDOWNUSDT',
  'BTCGBP',
  'BTCUAH',
  'BTCBIDR',
  'BTCAUD',
  'BTCDAI',
  'BTCBRL',
  'BTCSTBTC',
  'BTCSTBUSD',
  'BTCSTUSDT',
  'BTCVAI',
  'BTCUSDP',
  'BTCUST',
  'BTCPLN',
  'BTCRON',
  'BTCARS',
  'BTCFDUSD',
  'BTCAEUR',
];

const calculateMidPrice = (price: Price): number => {
  const commission = +(process.env.SERVICE_COMMISSION ?? DEFAULT_COMMISSION);
  const bid = parseFloat(price.bidPrice) * (ONE + commission);
  const ask = parseFloat(price.askPrice) * (ONE - commission);
  return (bid + ask) / TWO;
};

const createGetter = async () => {
  let cachedPrice: PriceAccumulator = {};
  const currenciesQuery = `["${CURRENCIES.join('","')}"]`;

  const updatePrice = async (): Promise<PriceAccumulator> => {
    try {
      const response = await fetch(
        'https://api.binance.com/api/v3/ticker/bookTicker?' +
          new URLSearchParams({ symbols: currenciesQuery }).toString(),
        {
          method: 'GET',
        },
      );

      const body: Price[] = await response.json();

      return body.reduce((acc: PriceAccumulator, price: Price) => {
        acc[price.symbol] = calculateMidPrice(price);
        return acc;
      }, {});
    } catch (exception) {
      console.error(exception?.message);
      return {};
    }
  };

  setInterval(
    () => {
      updatePrice().then((data) => {
        cachedPrice = data;
      });
    },
    +(process.env.UPDATE_INTERVAL ?? DEFAULT_UPDATE_INTERVAL) * SECOND,
  );

  cachedPrice = await updatePrice();

  return () => {
    return cachedPrice;
  };
};

(async () => {
  const app = express();
  const getter = await createGetter();

  app.use(express.json());

  app.get('/', async (_: Request, res: Response) => {
    try {
      res.json(getter());
    } catch (exception) {
      res.status(INTERNAL_SERVER_EXCEPTION_STATUS_CODE).json({ message: 'Server error' });
    }
  });

  app.listen(process.env.PORT ?? DEFAULT_PORT, () => console.debug('Service started'));
})();
