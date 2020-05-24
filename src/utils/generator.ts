import cryptoRandom from 'crypto-random-string';

export const generatePostID = () => cryptoRandom({ length: 25, type: 'base64' });

export const generateToken = () => cryptoRandom({ length: 20, type: 'base64' });