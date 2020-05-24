import bcrypt from 'bcrypt';
import * as response from '../utils/response';
import { AuthenticationController, RegistrationController } from './controller.types';
import * as repository from '../db/repository';
import { _messages } from '../utils/variables';

export const authenticate: AuthenticationController = async (req, res) => {
  const { username, password } = req.body;
  let authenticated = null;

  if (!repository.checkUsernameRegistered(username)) {
    return response.badRequest(res, _messages.username_not_registered);
  } else {
    const { name, password: hash } = repository.retrieveUserData(username);

    try {
      authenticated = await bcrypt.compare(password, hash);
    } catch (e) {
      return response.internalError(res, _messages.internal_error);
    }
    if (!authenticated) return response.unauthorized(res, _messages.wrong_credentials);
    return response.ok(res, {
      username,
      name
    });
  }
};

export const register: RegistrationController = async (req, res) => {
  const { name, password, username } = req.body;
  const saltRounds = 10;
  let encryptedPassword = null;

  if (!repository.checkUsernameAvailability(username)) {
    return response.badRequest(res, _messages.username_not_available);
  } else {
    try {
      encryptedPassword = await bcrypt.hash(password, saltRounds);
    } catch (e) {
      return response.internalError(res, _messages.internal_error);
    }
    repository.storeUserData(username, name, encryptedPassword);
    return response.ok(res, _messages.account_created);
  }
};