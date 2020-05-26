import express from 'express';
import * as repository from '../db/repository';
import { _cookies } from './variables';
import { generateToken } from './generator';

export const setTokenCookie = (res: express.Response, username: string, age: number = 1000 * 60 * 60 * 24) => {
  const token = generateToken();
  repository.storeSession(username, token);
  res.cookie(_cookies.token, token, {
    httpOnly: true,
    maxAge: age,
    path: '/',
    signed: true
  });
};