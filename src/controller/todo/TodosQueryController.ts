import { Response } from 'express';
import { CustomRequest } from '@/helpers/token';
import TODOsQueryService from '../../services/todos/todosQueryService';
import HandleError from '../../helpers/error';

export default class TODOsQueryController {
  private readonly todosQueryService: TODOsQueryService;

  constructor(todosQueryService: TODOsQueryService) {
    this.todosQueryService = todosQueryService;
  }

  public getAllTODOs = async (_req: CustomRequest, res: Response) => {
    try {
      const todos = await this.todosQueryService.getTODOs();

      if (todos.length === 0 || !todos) {
        throw new HandleError(404, 'BAD_REQUEST', { reason: 'No TODOs found' });
      }

      res.status(200).json(todos);
    } catch (error) {
      if (error instanceof HandleError) 
        res.status(error.code).json({ message: error.message, reason: error.data?.reason });
      else if (error instanceof Error) res.status(500).json({ 500: error.message });
      else res.status(500).json({ 500: 'Internal server error' }); 
    }
  };

  public getTODOById = async (req: CustomRequest, res: Response) => {
    try {
      if (!req.userId) {
        throw new HandleError(401, 'UNAUTHORIZED', { reason: 'User not authenticated' });
      }
      const todo = await this.todosQueryService.getTODO(req.userId);

      if (!todo) {
        throw new HandleError(404, 'BAD_REQUEST', { reason: 'No TODO found' });
      }

      res.status(200).json(todo); 
    } catch (error) {
      if (error instanceof HandleError) 
        res.status(error.code).json({ message: error.message, reason: error.data?.reason });
      else if (error instanceof Error) res.status(500).json({ 500: error.message });
      else res.status(500).json({ 500: 'Internal server error' }); 
    }
  };

  public getTODOsByUser = async (req: CustomRequest, res: Response) => {
    try {
      if (!req.userId) {
        throw new HandleError(401, 'UNAUTHORIZED', { reason: 'User not authenticated' });
      }

      const todos = await this.todosQueryService.getTODOsByUser(req.userId);

      if (!todos || todos.length === 0) {
        throw new HandleError(404, 'BAD_REQUEST', { reason: 'No TODOs found' });
      }

      res.status(200).json(todos);
    } catch (error) {
      if (error instanceof HandleError) 
        res.status(error.code).json({ message: error.message, reason: error.data?.reason });
      else if (error instanceof Error) res.status(500).json({ 500: error.message });
      else res.status(500).json({ 500: 'Internal server error' }); 
    }
  };
}