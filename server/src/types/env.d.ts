declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    PORT: string;
    REDIS_URL: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
    CLIENT_DOMAIN: string;
    NODEMAILER_EMAIL: string;
    NODEMAILER_PASSWORD: string;
    GITHUB_CLIENT_SECRET: string;
  }
}
