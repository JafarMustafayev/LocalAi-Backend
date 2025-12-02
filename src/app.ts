// ./src/app.ts
import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import { PrismaClient } from './generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

import { getPrismaClient } from './utils/prismaClient';

import * as routes from './routes/';
import config from './config/config';

const app = express();

getPrismaClient();

app.use(express.json());
app.use('/api/conversations', routes.chatRouter);
app.use(errorHandler);

export default app;
