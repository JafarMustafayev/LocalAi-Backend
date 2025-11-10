// ./src/app.ts
import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import * as routes from './routes/';

const app = express();

app.use(express.json());
app.use('/api/conversations', routes.chatRouter);
app.use(errorHandler);

export default app;
