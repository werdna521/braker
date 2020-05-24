import db, { UserSchema } from './lowdb';

export const checkUsernameAvailability = (username: string) => {
  return db.get('users')
    .filter({ username })
    .size()
    .value() === 0;
};

export const storeUserData = (username: string, name: string, password: string) => {
  db.get('users')
    .push({ username, name, password })
    .write();
};

export const checkUsernameRegistered = (username: string) => !checkUsernameAvailability(username);

export const retrieveUserData = (username: string): UserSchema => {
  return db.get('users')
    .filter({ username })
    .first()
    .value()
};