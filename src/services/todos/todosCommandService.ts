import TODOsCommandRepository from '../../models/todos/todosCommandRepository';
import { TODOsDocument } from '@/types/todos/todos';
import HandleError from '../../helpers/error';

export default class TODOsCommandService {
  private readonly todosCommandRepository: TODOsCommandRepository;

  constructor(todosCommandRepository: TODOsCommandRepository) {
    this.todosCommandRepository = todosCommandRepository;
  }

  public async createTODO(data: TODOsDocument) {
    try {
      if (!data.name || !data.description || !data.userId) {
        throw new HandleError(400, 'BAD_REQUEST', { reason: 'Title is required' });
      }

      return await this.todosCommandRepository.create(data);
    } catch (error) {
      if (error instanceof HandleError) throw new HandleError(error.code, error.message, error?.data);
      else if (error instanceof Error) throw new HandleError(500, error.message);
      else throw new HandleError(500, 'Internal server error');
    }
  }

  public async updateTODO(id: string, data: TODOsDocument) {
    try {
      if (!id) throw new HandleError(400, 'BAD_REQUEST', { reason: 'Id is required' });

      return await this.todosCommandRepository.update(id, data);
    } catch (error) {
      if (error instanceof HandleError) throw new HandleError(error.code, error.message, error?.data);
      else if (error instanceof Error) throw new HandleError(500, error.message);
      else throw new HandleError(500, 'Internal server error');
    }
  }

  public async deleteTODO(id: string) {
    try {
      if (!id) throw new HandleError(400, 'BAD_REQUEST', { reason: 'Id is required' });

      return await this.todosCommandRepository.delete(id);
    } catch (error) {
      if (error instanceof HandleError) throw new HandleError(error.code, error.message, error?.data);
      else if (error instanceof Error) throw new HandleError(500, error.message);
      else throw new HandleError(500, 'Internal server error');
    }
  }
}