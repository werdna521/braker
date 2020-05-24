import _ from 'lodash';
import express from 'express';
import * as response from './response';
import * as repository from '../db/repository';
import { _messages } from './variables';

const generateErrorMessage = (errorFields: string[]): string => {
  return `The field(s) ${_.join(errorFields, ', ')} is/are required`;
};

export const validateRequired = (fields: any, res: express.Response) => {
  const fieldsWithError = _.omitBy(fields, _.isString);
  if (_.size(fieldsWithError) !== 0) {
    response.badRequest(res, generateErrorMessage(_.keys(fieldsWithError)));
    return false;
  }
  return true;
};

export const validateUsername = (username: string, res: express.Response) => {
  if (!repository.checkUsernameRegistered(username)) {
    response.badRequest(res, _messages.username_not_registered);
    return false;
  }
  return true;
};