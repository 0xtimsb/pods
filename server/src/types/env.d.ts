declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    PORT: string;
    REDIS_URL: string;
    SESSION_SECRET: string;
  }
}
