// ./src/controllers/chatController.ts
import type { Request, Response, NextFunction } from 'express';
import { Chat, chats } from '../models/chat';

export const getChats = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(chats);
  } catch (error) {
    next(error);
  }
};
