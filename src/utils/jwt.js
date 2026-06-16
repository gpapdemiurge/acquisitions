import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';

const JWT_SECRET = env.JWT_SECRET;

const JWT_EXPIRATION = env.JWT_EXPIRATION;

export const jwttoken = {
  sign: (payload) => {
    try {
      return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    } catch (error) {
      console.error('Error signing JWT:', error);
      throw new Error('Failed to sign JWT', { cause: error });
    }
  },
  verify: (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.error('Error verifying JWT:', error);
      throw new Error('Failed to verify JWT', { cause: error });
    }
  },
};
