// ./src/app.ts
import express from 'express';
import { errorHandler } from './middlewares/error.middleware';
import { getPrismaClient } from './utils/prismaClient';
import * as routes from './routes/';

const app = express();

getPrismaClient();

app.use(express.json());
app.use('/api/conversations', routes.chatRouter);
app.use(errorHandler);

export default app;
