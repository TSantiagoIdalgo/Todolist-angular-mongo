import TODOsCommandService from '../../services/todos/todosCommandService';
import { Response } from 'express';
import { CustomRequest } from '@/helpers/token';
import HandleError from '../../helpers/error';

export default class TODOsCommandController {
  private readonly todosCommandService: TODOsCommandService;

  constructor(todosCommandService: TODOsCommandService) {
    this.todosCommandService = todosCommandService;
  }

  public createTODO = async (req: CustomRequest, res: Response) => {
    try {
      if (!req.userId) {
        throw new HandleError(401, 'UNAUTHORIZED', { reason: 'User not authenticated' });
      }

      const todo = await this.todosCommandService.createTODO({ userId: req.userId, ...req.body });

      if (!todo) throw new HandleError(500, 'INTERNAL_SERVER_ERROR');

      res.status(201).json(todo);
    } catch (error) {
      if (error instanceof HandleError) 
        res.status(error.code).json({ message: error.message, reason: error.data?.reason });
      else if (error instanceof Error) res.status(500).json({ 500: error.message });
      else res.status(500).json({ 500: 'Internal server error' }); 
    }
  };

  public updateTODO = async (req: CustomRequest, res: Response) => {
    try {
      if (!req.userId) {
        throw new HandleError(401, 'UNAUTHORIZED', { reason: 'User not authenticated' });
      }

      if (!req.params.id) {
        throw new HandleError(400, 'BAD_REQUEST', { reason: 'Missing id parameter' });
      }

      if (req.body.userId && req.body.userId !== req.userId) {
        throw new HandleError(403, 'FORBIDDEN', { 
          reason: 'User is not authorized to update this todo' 
        });
      }

      const todo = await this.todosCommandService.updateTODO(req.params.id, req.body);

      if (!todo) throw new HandleError(500, 'INTERNAL_SERVER_ERROR');

      res.status(200).json(todo);
    } catch (error) {
      if (error instanceof HandleError) 
        res.status(error.code).json({ message: error.message, reason: error.data?.reason });
      else if (error instanceof Error) res.status(500).json({ 500: error.message });
      else res.status(500).json({ 500: 'Internal server error' }); 
    }
  };

  public deleteTODO = async (req: CustomRequest, res: Response) => {
    try {
      if (!req.userId) {
        throw new HandleError(401, 'UNAUTHORIZED', { reason: 'User not authenticated' });
      }

      if (!req.params.id) {
        throw new HandleError(400, 'BAD_REQUEST', { reason: 'Missing id parameter' });
      }

      const todo = await this.todosCommandService.deleteTODO(req.params.id);

      if (!todo) throw new HandleError(500, 'INTERNAL_SERVER_ERROR');

      res.status(200).json(todo);
    } catch (error) {
      if (error instanceof HandleError)
        res.status(error.code).json({ message: error.message, reason: error.data?.reason });
      else if (error instanceof Error) res.status(500).json({ 500: error.message });
      else res.status(500).json({ 500: 'Internal server error' });
    }
  };
}