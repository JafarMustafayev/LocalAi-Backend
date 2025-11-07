import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import * as routes from './routes/';

const app = express();

app.use('/api/chats', routes.chatRouter);
app.use(express.json());
app.use(errorHandler);

export default app;
