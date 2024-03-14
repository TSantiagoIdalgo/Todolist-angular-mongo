import { Router } from 'express';
import { tokenVerify } from '../../helpers/token';
import UserCommandRepository from '../../models/user/userCommandRepository';
import UserCommandService from '../../services/user/userCommandService';
import UserCommandController from '../../controller/user/userCommandController';

const userCommandRepository = new UserCommandRepository();
const userCommandService = new UserCommandService(userCommandRepository);
const userCommandController = new UserCommandController(userCommandService);

const userCommandRouter = Router();

userCommandRouter.post('/', userCommandController.createUser);

userCommandRouter.put('/', tokenVerify, userCommandController.updateUser);

userCommandRouter.put('/verify', userCommandController.verifyUser);

userCommandRouter.delete('/', tokenVerify, userCommandController.deleteUser);

export default userCommandRouter;