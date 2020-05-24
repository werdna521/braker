import express from 'express';

export type JSONSuccessResponseHandler = (
  res: express.Response,
  data: any
) => void;

export type JSONErrorResponseHandler = (
  res: express.Response,
  message: string
) => any;