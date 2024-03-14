import jwt from 'jsonwebtoken';
import { IUserLogin } from '../types/user/user';
import { API_SECRET } from '../config/api';
import { Request, Response, NextFunction } from 'express';
import SessionModel from '../database/collections/user/sessionSchema';
import HandleError from './error';

export interface CustomRequest extends Request {
  userId?: string;
}

export const tokenVerify = async (req: CustomRequest, _res: Response, next: NextFunction) => {
  const token = req.cookies['XSRF-TOKEN'];
  if (!token) {
    throw new HandleError(400, 'UNAUTHENTICATED', { 
      reason: 'An authentication token was not provided' });
  }
  try {
    const decoded = jwt.verify(token, API_SECRET) as IUserLogin;
    const session = await SessionModel.findOne({ token: decoded.csrfToken });

    if (!session) throw new HandleError(400, 'UNAUTHENTICATED', { reason: 'Invalid token' });

    req.userId = decoded.email;
    return next();
  } catch (error) {
    if (error instanceof Error) return next(new Error(error.message));
    else return next();
  }
};