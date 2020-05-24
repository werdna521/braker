import express from 'express';

export type Middleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void;