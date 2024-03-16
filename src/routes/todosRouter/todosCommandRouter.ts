import { tokenVerify } from '../../helpers/token';
import { Router } from 'express';
import TODOsCommandRepository from '../../models/todos/todosCommandRepository';
import TODOsCommandService from '../../services/todos/todosCommandService';
import TODOsCommandController from '../../controller/todo/TodosCommandController';

const todosCommandRepository = new TODOsCommandRepository();
const todosCommandService = new TODOsCommandService(todosCommandRepository);
const todosCommandController = new TODOsCommandController(todosCommandService);

const todosCommandRouter = Router();

todosCommandRouter.post('/', tokenVerify, todosCommandController.createTODO);

todosCommandRouter.put('/:id', tokenVerify, todosCommandController.updateTODO);

todosCommandRouter.delete('/:id', tokenVerify, todosCommandController.deleteTODO);

export default todosCommandRouter;