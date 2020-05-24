import express from 'express';

export type ControllerGetNoParams = (
  req: express.Request,
  res: express.Response
) => void;

type AuthControllerAuthenticateBody = {
  username: string,
  password: string
};

export type AuthControllerAuthenticate = (
  req: express.Request<undefined, undefined, AuthControllerAuthenticateBody, undefined>,
  res: express.Response
) => void;

type AuthControllerRegisterBody = {
  username: string,
  name: string,
  password: string
};

export type AuthControllerRegister = (
  req: express.Request<undefined, undefined, AuthControllerRegisterBody, undefined>,
  res: express.Response
) => void;

type PostControllerCreatePostBody = {
  title: string,
  content: string
};

export type PostControllerCreatePost = (
  req: express.Request<undefined, undefined, PostControllerCreatePostBody, undefined>,
  res: express.Response
) => void;