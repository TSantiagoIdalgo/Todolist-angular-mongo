import { Router } from 'express';
import UserQueryRepository from '../../models/user/userQueryRepository';
import UserCommandRepository from '../../models/user/userCommandRepository';
import UserQueryService from '../../services/user/userQueryService';
import UserQueryController from '../../controller/user/userQueryController';

const userQueryRepository = new UserQueryRepository();
const userCommandRepository = new UserCommandRepository();
const userQueryService = new UserQueryService(userQueryRepository, userCommandRepository);
const userQueryController = new UserQueryController(userQueryService);

const userQueryRouter = Router();

userQueryRouter.get('/', userQueryController.getAllUser);

userQueryRouter.get('/:id', userQueryController.getUserById);

userQueryRouter.post('/login', userQueryController.userLogin);

userQueryRouter.post('/login/network', userQueryController.userNetworkLogin);

export default userQueryRouter;