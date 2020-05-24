import { JSONSuccessResponseHandler, JSONErrorResponseHandler } from '../types/response.types';

export const ok: JSONSuccessResponseHandler = (res, data) => {
  res.json({
    status: 200,
    data
  }).end();
};

export const badRequest: JSONErrorResponseHandler = (res, message) => {
  res.json({
    status: 400,
    message
  }).end();
};

export const unauthorized: JSONErrorResponseHandler = (res, message) => {
  res.json({
    status: 401,
    message
  }).end();
};

export const internalError: JSONErrorResponseHandler = (res, message) => {
  res.json({
    status: 500,
    message
  });
};