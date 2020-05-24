import db from './lowdb';
import { PostSchema, UserSchema } from '../types/dbschema.types';

export const checkUsernameAvailability = (username: string): boolean => {
  return db.get('users')
    .filter({ username })
    .size()
    .value() === 0;
};

export const storeUserData = (username: string, name: string, password: string, session: string): void => {
  db.get('users')
    .push({ username, name, password, session })
    .write();
};

export const storeSession = (username: string, session: string): void => {
  db.get('users')
    .filter({ username })
    .set('[0].session', session)
    .write();
};

export const checkUsernameRegistered = (username: string): boolean => !checkUsernameAvailability(username);

export const retrieveUserData = (username: string): UserSchema => {
  return db.get('users')
    .filter({ username })
    .first()
    .value();
};

export const retrieveAllPosts = (): PostSchema[] => {
  return db.get('posts')
    .value();
};

export const storePost = (post: PostSchema) => {
  db.get('posts')
    .push(post)
    .write();
};

export const checkSession = (session: string) => {
  return db.get('users')
    .filter({ session })
    .size()
    .value() === 1;
};

export const retrieveUserDataBySession = (session: string) => {
  return db.get('users')
    .filter({ session })
    .first()
    .value();
};