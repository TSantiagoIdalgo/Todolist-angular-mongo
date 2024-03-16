import { Router } from 'express';
import TODOsQueryRepository from '../../models/todos/todosQueryRepository';
import TODOsQueryService from '../../services/todos/todosQueryService';
import TODOsQueryController from '../../controller/todo/TodosQueryController';

const todosQueryRepository = new TODOsQueryRepository();
const todosQueryService = new TODOsQueryService(todosQueryRepository);
const todosQueryController = new TODOsQueryController(todosQueryService);

const TODOsQueryRouter = Router();

TODOsQueryRouter.get('/', todosQueryController.getAllTODOs);

TODOsQueryRouter.get('/:id', todosQueryController.getTODOById);

TODOsQueryRouter.get('/user/:id', todosQueryController.getTODOsByUser);

export default TODOsQueryRouter;