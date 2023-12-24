declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string | number;
      UPDATE_INTERVAL?: number;
      SERVICE_COMMISSION?: number;
    }
  }
}

export {};
