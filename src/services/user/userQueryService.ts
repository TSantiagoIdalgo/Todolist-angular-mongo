import { API_SECRET } from '../../config/api';
import UserQueryRepository from '../../models/user/userQueryRepository';
import UserCommandRepository from '../../models/user/userCommandRepository';
import HandleError from '../../helpers/error';
import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default class UserQueryService {
  private readonly userQueryRepository: UserQueryRepository;
  private readonly userCommandRepository: UserCommandRepository;

  constructor(userQueryRepository: UserQueryRepository, userCommandRepository: UserCommandRepository) {
    this.userQueryRepository = userQueryRepository;
    this.userCommandRepository = userCommandRepository;
  }

  async getUsers () {
    try {
      const users = await this.userQueryRepository.getAll();
      if (users.length === 0) 
        throw new HandleError(404, 'BAD_REQUEST', { reason: 'No users found' });
      return users; 
    } catch (error) {
      if (error instanceof HandleError) throw new HandleError(error.code, error.message, error?.data);
      else if (error instanceof Error) throw new HandleError(500, error.message);
      else throw new HandleError(500, 'Internal server error');
    }
  }

  async getUserById (userId: string) {
    try {
      const user = await this.userQueryRepository.getById(userId);
      if (!user)
        throw new HandleError(404, 'BAD_REQUEST', { reason: 'User not found' });
      return user;
    } catch (error) {
      if (error instanceof HandleError) throw new HandleError(error.code, error.message, error?.data);
      else if (error instanceof Error) throw new HandleError(500, error.message);
      else throw new HandleError(500, 'Internal server error');
    }
  }

  async Login (email: string, password: string, tokenCSRF: string) {
    try {
      const user = await this.userQueryRepository.getById(email).lean().exec();
      
      if (!user) {
        throw new HandleError(404, 'BAD_REQUEST', { reason: 'Email or password are incorrect' });
      }

      const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password);
      if (!passwordCorrect) throw new HandleError(401, 'BAD_REQUEST', { 
        reason: 'Email or password are incorrect' 
      });

      const payload = {
        name: user.userName, 
        email: user.email, 
        csrfToken: tokenCSRF
      };
      const token = Jwt.sign(payload, API_SECRET);
      await this.userCommandRepository.saveSession(tokenCSRF, user._id);

      return token;
    } catch (error) {
      if (error instanceof HandleError) throw new HandleError(error.code, error.message, error?.data);
      else if (error instanceof Error) throw new HandleError(500, error.message);
      else throw new HandleError(500, 'Internal server error');
    }
  }

  async NetworkLogin (userName: string, email: string, image: string, tokenCSRF: string) {
    try {
      let userFind = await this.userQueryRepository.getById(email);
      const password = crypto.randomUUID();

      if (!userFind) {
        userFind = await this.userCommandRepository.create(userName, email, password, image);
      }

      const token = Jwt.sign({ userName, email, csrfToken: tokenCSRF }, API_SECRET);
      await this.userCommandRepository.saveSession(tokenCSRF, userFind._id);

      return token;
    } catch (error) {
      if (error instanceof HandleError) throw new HandleError(error.code, error.message, error?.data);
      else if (error instanceof Error) throw new HandleError(500, error.message);
      else throw new HandleError(500, 'Internal server error');
    }
  }
}