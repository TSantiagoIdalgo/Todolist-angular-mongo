import TODOsQueryRepository from '../../models/todos/todosQueryRepository';
import HandleError from '../../helpers/error';

export default class TODOsQueryService {
  private readonly todosRepository: TODOsQueryRepository;

  constructor(todosRepository: TODOsQueryRepository) {
    this.todosRepository = todosRepository;
  }

  public async getTODOs() {
    try {
      const todos = await this.todosRepository.getAll();

      if (todos.length === 0) throw new HandleError(404, 'BAD_REQUEST', { reason: 'TODOs not found' });

      return todos;
    } catch (error) {
      if (error instanceof HandleError) throw new HandleError(error.code, error.message, error?.data);
      else if (error instanceof Error) throw new HandleError(500, error.message);
      else throw new HandleError(500, 'Internal server error');
    }
  }

  public async getTODO (id: string) {
    try {
      if (!id) throw new HandleError(400, 'BAD_REQUEST', { reason: 'Id is required' });
      
      const todo = await this.todosRepository.getById(id);

      if (!todo) throw new HandleError(404, 'BAD_REQUEST', { reason: 'TODO not found' });

      return todo;
    } catch (error) {
      if (error instanceof HandleError) throw new HandleError(error.code, error.message, error?.data);
      else if (error instanceof Error) throw new HandleError(500, error.message);
      else throw new HandleError(500, 'Internal server error');
    }
  }

  public async getTODOsByUser (userId: string) {
    try {
      if (!userId) throw new HandleError(400, 'BAD_REQUEST', { reason: 'User id is required' });

      const todos = await this.todosRepository.getByUser(userId);

      if (todos.length === 0) {
        throw new HandleError(404, 'BAD_REQUEST', { reason: 'TODOs not found' });
      }

      return todos;
    } catch (error) {
      if (error instanceof HandleError) throw new HandleError(error.code, error.message, error?.data);
      else if (error instanceof Error) throw new HandleError(500, error.message);
      else throw new HandleError(500, 'Internal server error');
    }
  }
}