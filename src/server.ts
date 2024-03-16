import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userQueryRouter from './routes/userRouter/userQueryRouter';
import userCommandRouter from './routes/userRouter/userCommandRouter';
import TODOsQueryRouter from './routes/todosRouter/todosQueryRouter';
import todosCommandRouter from './routes/todosRouter/todosCommandRouter';
import cookieparse from 'cookie-parser';
import { CORS_CONFIG } from './config/cors';

const server = express();

server.use(express.json());
server.use(cors(CORS_CONFIG));
server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));
server.use(cookieparse());
server.use(morgan('dev'));

server.use('/user', userQueryRouter);
server.use('/user', userCommandRouter);

server.use('/todos', TODOsQueryRouter);
server.use('/todos', todosCommandRouter);

export default server;