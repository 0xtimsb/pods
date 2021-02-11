import { Request, Response } from "express";
import { Redis } from "ioredis";

export interface Context {
  req: Request & {
    session: Express.Session;
  };
  res: Response;
  redis: Redis;
}
