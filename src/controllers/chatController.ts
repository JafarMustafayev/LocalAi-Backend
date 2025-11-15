// ./src/controllers/chatController.ts
import type { Request, Response, NextFunction } from 'express';
import { ResponseHelper } from '../utils/responseHelper';
import { NotFoundException, BadRequestException } from '../exceptions/customExceptions';

export const getChats = (req: Request, res: Response, next: NextFunction) => {};

export const getChat = (req: Request, res: Response, next: NextFunction) => {};

// Create new chat
export const createNewChat = (req: Request, res: Response, next: NextFunction) => {};

// Rename chat
export const renameChat = (req: Request, res: Response, next: NextFunction) => {};

// Archive or unarchive chat
export const toggleArchiveChat = (req: Request, res: Response, next: NextFunction) => {};

// Delete chat
export const deleteChat = (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new NotFoundException('Chat tapılmadı.');

    ResponseHelper.success(res, 'Chat uğurla silindi.');
  } catch (error) {
    next(error);
  }
};
