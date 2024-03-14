import { IUser } from '@/types/user/user';
import HandleError  from '../../helpers/error';
import UserCommandRepository from '../../models/user/userCommandRepository';

export default class UserCommandService {
  private readonly userCommandRepository: UserCommandRepository;

  constructor(userCommandRepository: UserCommandRepository) {
    this.userCommandRepository = userCommandRepository;
  }

  public async createUser(user: IUser) {
    try {
      const { userName, email, password } = user;

      return await this.userCommandRepository.create(userName, email, password);
    } catch (error) {
      if (error instanceof HandleError) throw new HandleError(error.code, error.message, error?.data);
      else if (error instanceof Error) throw new HandleError(500, error.message);
      else throw new HandleError(500, 'Internal server error');
    }
  }

  
  public async updateUser (userId: string, user: IUser ) {
    try {
      if (!userId) throw new HandleError(400, 'BAD_REQUEST', { reason: 'Missing data' });
      const userUpdated = await this.userCommandRepository.update(userId, user);
      if (!userUpdated) throw new HandleError(400, 'BAD_REQUEST', { reason: 'Missing data' });
      return userUpdated;
    } catch (error) {
      if (error instanceof HandleError) throw new HandleError(error.code, error.message, error?.data);
      else if (error instanceof Error) throw new HandleError(500, error.message);
      else throw new HandleError(500, 'Internal server error');
    }
  }

  public async deleteUser (id: string) {
    try {
      if (!id) throw new HandleError(400, 'BAD_REQUEST', { reason: 'Missing data' });
      const userDeleted = await this.userCommandRepository.delete(id);
      if (!userDeleted) throw new Error('User not found');
      return userDeleted; 
    } catch (error) {
      if (error instanceof HandleError) throw new HandleError(error.code, error.message, error?.data);
      else if (error instanceof Error) throw new HandleError(500, error.message);
      else throw new HandleError(500, 'Internal server error');
    }
  }

  public async userVerify (token: string) {
    try {
      if (!token) throw new Error('Missing data');
      return await this.userCommandRepository.verify(token);
    } catch (error) {
      if (error instanceof HandleError) throw new HandleError(error.code, error.message, error?.data);
      else if (error instanceof Error) throw new HandleError(500, error.message);
      else throw new HandleError(500, 'Internal server error');
    }
  }
}