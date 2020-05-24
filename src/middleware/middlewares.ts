import * as response from '../utils/response';
import { Middleware } from '../types/middleware.types';
import { _messages } from '../utils/variables';
import { checkSession, retrieveUserDataBySession } from '../db/repository';

export const cookieMan: Middleware = (req, res, next) => {
  const { token } = req.signedCookies;

  if (!token) return response.badRequest(res, _messages.token_not_provided);
  if (!checkSession(token)) return response.unauthorized(res, _messages.unauthorized);

  req.cookies.user = retrieveUserDataBySession(token);
  next();
};