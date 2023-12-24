### Requirements

- Node.js 18+
- Docker

### Environment variables

- `PORT` microservice port
- `UPDATE_INTERVAL` update interval in seconds
- `SERVICE_COMMISSION` service commission in %

### Usage

Run via Docker:

```shell
npm install
npm run docker
```

or run without Docker:

```shell
npm install
npm run build
npm run start
```

After this you can get BTC price by fetch GET `http://127.0.0.1:3000` endpoint

Example of success response (for example, 1 BTC = 43659.53495 USDT):
```json
{
    "BTCUSDT": 43659.53495,
    "BTCTUSD": 43717.00495,
    "BTCPAX": 0,
    "BTCUSDC": 43682.84495,
    "BTCUSDS": 0,
    "BTCBBTC": 0,
    "BTCBUSD": 0,
    "BTCNGN": 50861293.49,
    "BTCRUB": 3929641.565,
    "BTCTRY": 1285334.02,
    "BTCEUR": 39975.8094,
    "BTCZAR": 841271.405,
    "BTCBKRW": 0,
    "BTCIDRT": 0,
    "BTCUPUSDT": 12.098980000000001,
    "BTCDOWNUSDT": 0.0025224949999999996,
    "BTCGBP": 35763.906449999995,
    "BTCUAH": 1844670.455,
    "BTCBIDR": 673802230.145,
    "BTCAUD": 0,
    "BTCDAI": 43694.1861,
    "BTCBRL": 215333.495,
    "BTCSTBTC": 0,
    "BTCSTBUSD": 0,
    "BTCSTUSDT": 0,
    "BTCVAI": 0,
    "BTCUSDP": 0,
    "BTCUST": 0,
    "BTCPLN": 173916.28,
    "BTCRON": 199364.92,
    "BTCARS": 42410620.405,
    "BTCFDUSD": 43678.4229,
    "BTCAEUR": 39924.90545
}
```
