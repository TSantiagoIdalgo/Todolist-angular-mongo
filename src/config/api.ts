import { config } from 'dotenv';
import { Request } from 'express';
import { doubleCsrf } from 'csrf-csrf';
config();

const csrfProtection = doubleCsrf({
  getSecret: () => 'Secret',
  cookieName: '__Host-psifi.x-csrf-token',
  cookieOptions: {
    sameSite: 'strict',
    path: '/',
    secure: false,
    maxAge: 604800
  },
  size: 32,
  getTokenFromRequest: (req: Request) => req.headers['x-csrf-token'],
});

export const AUTH_SERVICE = process.env.AUTH_SERVICE ?? '';
export const API_SECRET = process.env.SECRET ?? '';
export const { generateToken } = csrfProtection;