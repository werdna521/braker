import express from 'express';

type AuthenticationControllerBody = {
  username: string,
  password: string
};

export type AuthenticationController = (
  req: express.Request<undefined, undefined, AuthenticationControllerBody, undefined>,
  res: express.Response
) => void;

type RegistrationControllerBody = {
  username: string,
  name: string,
  password: string
};

export type RegistrationController = (
  req: express.Request<undefined, undefined, RegistrationControllerBody,undefined>,
  res: express.Response
) => void;