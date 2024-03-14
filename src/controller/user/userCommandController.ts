import { Request, Response } from 'express';
import { CustomRequest } from '@/helpers/token';
import HandleError from '../../helpers/error';
import UserCommandService from '../../services/user/userCommandService';

export default class UserCommandController {
  private readonly userCommandService: UserCommandService;

  constructor(userCommandService: UserCommandService) {
    this.userCommandService = userCommandService;
  }

  public createUser = async (req: Request, res: Response) => {
    try {
      const { userName, email, password } = req.body;

      if (!userName || !email || !password)
        throw new HandleError(400, 'BAD_REQUEST', { reason: 'Missing required fields' });

      const user = await this.userCommandService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof HandleError) 
        res.status(error.code).json({ message: error.message, reason: error.data?.reason });
      else if (error instanceof Error) res.status(500).json({ 500: error.message });
      else res.status(500).json({ 500: 'Internal server error' }); 
    }
  };
  
  public updateUser = async (req: CustomRequest, res: Response) => {
    const userId = req.userId;
    const user = req.body;
    try {
      if (userId === undefined) {
        throw new HandleError(400, 'BAD_REQUEST', { reason: 'User id is undefined' });
      }
      
      const userUpdated = await this.userCommandService.updateUser(userId, user);
      if (userUpdated === null ) {
        throw new HandleError(400, 'BAD_REQUEST', { reason: 'User not found' });
      }
      res.status(200).json(userUpdated);
    } catch (error) {
      if (error instanceof HandleError) 
        res.status(error.code).json({ message: error.message, reason: error.data?.reason });
      else if (error instanceof Error) res.status(500).json({ 500: error.message });
      else res.status(500).json({ 500: 'Internal server error' }); 
    }
  };

  public deleteUser = async (req: CustomRequest, res: Response) => {
    const userId = req.userId;
    try {
      if (userId === undefined) {
        throw new HandleError(400, 'BAD_REQUEST', { reason: 'UserId is undefined' });
      }

      const user = await this.userCommandService.deleteUser(userId);
      if (user === null) {
        throw new HandleError(400, 'BAD_REQUEST', { reason: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof HandleError) 
        res.status(error.code).json({ message: error.message, reason: error.data?.reason });
      else if (error instanceof Error) res.status(500).json({ 500: error.message });
      else res.status(500).json({ 500: 'Internal server error' }); 
    }
  };

  public verifyUser = async (req: Request, res: Response) => {
    const { token } = req.query;
    try {
      if (token === undefined || typeof token !== 'string') {
        throw new HandleError(400, 'BAD_REQUEST', { reason: 'Token is undefined' });
      }
      
      const user = await this.userCommandService.userVerify(token);

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof HandleError) 
        res.status(error.code).json({ message: error.message, reason: error.data?.reason });
      else if (error instanceof Error) res.status(500).json({ 500: error.message });
      else res.status(500).json({ 500: 'Internal server error' }); 
    }
  };
}