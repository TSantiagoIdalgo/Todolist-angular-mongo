import { Request, Response } from 'express';
import { generateToken } from '../../config/api';
import HandleError from '../../helpers/error';
import UserQueryService from '../../services/user/userQueryService';

export default class UserQueryController {
  private userQueryService: UserQueryService;

  constructor(userQueryService: UserQueryService) {
    this.userQueryService = userQueryService;
  }

  public getAllUser = async (_req: Request, res: Response) => {
    try {
      const users = await this.userQueryService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      if (error instanceof HandleError) 
        res.status(error.code).json({ message: error.message, reason: error.data?.reason });
      else if (error instanceof Error) res.status(500).json({ 500: error.message });
      else res.status(500).json({ 500: 'Internal server error' }); 
    }
  };

  public getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await this.userQueryService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof HandleError)
        res.status(error.code).json({ message: error.message, reason: error.data?.reason });
      else if (error instanceof Error) res.status(500).json({ 500: error.message });
      else res.status(500).json({ 500: 'Internal server error' });
    }
  };

  public userLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const tokenCSRF = generateToken(req, res);
      if (!email || !password) 
        throw new HandleError(400, 'BAD_REQUEST', { reason: 'Email or password is missing' });
      const token = await this.userQueryService.Login(email, password, tokenCSRF);

      res.cookie('XSRF-TOKEN', token, {
        httpOnly: true, 
        secure: false, 
        sameSite: 'strict' 
      });
      res.status(200).json({ token });
    } catch (error) {
      if (error instanceof HandleError)
        res.status(error.code).json({ message: error.message, reason: error.data?.reason });
      else if (error instanceof Error) res.status(500).json({ 500: error.message });
      else res.status(500).json({ 500: 'Internal server error' });
    }
  };

  public userNetworkLogin = async (req: Request, res: Response) => {
    try {
      const { email, userName, image } = req.body;
      const tokenCSRF = generateToken(req, res);
      const token = await this.userQueryService.NetworkLogin(userName, email, image, tokenCSRF);

      res.cookie('XSRF-TOKEN', token, {
        httpOnly: true, 
        secure: false, 
        sameSite: 'strict' 
      });
      res.status(200).json({ token });
    } catch (error) {
      if (error instanceof HandleError)
        res.status(error.code).json({ message: error.message, reason: error.data?.reason });
      else if (error instanceof Error) res.status(500).json({ 500: error.message });
      else res.status(500).json({ 500: 'Internal server error' });
    }
  };
}