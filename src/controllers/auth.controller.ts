import bcrypt from 'bcrypt';
import * as response from '../utils/response';
import * as repository from '../db/repository';
import { AuthControllerAuthenticate, AuthControllerRegister, ControllerGetNoParams } from '../types/controller.types';
import { _messages } from '../utils/variables';
import { setTokenCookie } from '../utils/cookie';

export const superman: ControllerGetNoParams = async (req, res) => {
  const { username } = req.cookies.user;
  const { name } = repository.retrieveUserData(username);
  response.ok(res, { username, name });
};

export const signOut: ControllerGetNoParams = async (req, res) => {
  const { username } = req.cookies.user;
  setTokenCookie(res, username, 0);
  response.ok(res, { message: 'Sign out successful' });
};

export const authenticate: AuthControllerAuthenticate = async (req, res) => {
  const { username, password } = req.body;
  let authenticated = null;

  if (!repository.checkUsernameRegistered(username)) return response.badRequest(res, _messages.username_not_registered);

  const { name, password: hash } = repository.retrieveUserData(username);

  try {
    authenticated = await bcrypt.compare(password, hash);
  } catch (e) {
    return response.internalError(res, _messages.internal_error);
  }

  if (!authenticated) return response.unauthorized(res, _messages.wrong_credentials);
  setTokenCookie(res, username);
  return response.ok(res, { username, name });
};

export const register: AuthControllerRegister = async (req, res) => {
  const { name, password, username } = req.body;
  const saltRounds = 10;
  let encryptedPassword = null;

  if (!repository.checkUsernameAvailability(username)) {
    return response.badRequest(res, _messages.username_not_available);
  }

  try {
    encryptedPassword = await bcrypt.hash(password, saltRounds);
  } catch (e) {
    return response.internalError(res, _messages.internal_error);
  }

  repository.storeUserData(username, name, encryptedPassword, '');
  return response.ok(res, _messages.account_created);
};