// ./src/app.ts
import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import { PrismaClient } from './generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

import * as routes from './routes/';
import config from './config/config';

const app = express();

const pool = new Pool({ connectionString: config.databaseUrl });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
  log: config.nodeEnv === 'development' ? ['query', 'error', 'warn', 'info'] : [],
});

app.use(express.json());
app.use('/api/conversations', routes.chatRouter);
app.use(errorHandler);

export default app;
