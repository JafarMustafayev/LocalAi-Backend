// ./src/controllers/chatController.ts
import type { Request, Response, NextFunction } from 'express';
import { Chat, chats } from '../models/chat';
import { ResponseHelper } from '../utils/responseHelper';
import { NotFoundException, BadRequestException } from '../exceptions/customExceptions';
import { randomUUID } from 'crypto';
import { Message, mesages } from '../models/message';

export const getChats = (req: Request, res: Response, next: NextFunction) => {
  try {
    ResponseHelper.success(
      res,
      chats.filter((x) => !x.isDeleted),
      'The data was successfully fetched.'
    );
  } catch (error) {
    next(error);
  }
};

export const getChat = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    var chat = chats.find((x) => x.id === id && !x.isDeleted);
    if (!chat) throw new NotFoundException('İstədiyiniz məlumat tapılmadı');
    ResponseHelper.success(res, chat, 'The data was successfully fetched.');
  } catch (error) {
    next(error);
  }
};

// Create new chat
export const createNewChat = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content, modelId } = req.body;

    if (!content || !modelId) {
      throw new BadRequestException('Content və modelId vacib sahələrdir.');
    }
    const now = Date.now();
    const newChat: Chat = {
      id: randomUUID(),
      title: content,
      modelId,
      createdAt: now,
      updatedAt: now,
      isArchived: false,
      isDeleted: false,
      namedBy: 'Assistant',
      messages: [],
    };

    newChat.messages?.push({
      id: randomUUID(),
      chatId: newChat.id,
      role: 'user',
      content,
      timestamp: now,
      isThinking: false,
    });

    chats.push(newChat);
    ResponseHelper.success(res, newChat, 'Chat uğurla yaradıldı.');
  } catch (error) {
    next(error);
  }
};

// Rename chat
export const renameChat = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) throw new BadRequestException('Yeni başlıq daxil edilməlidir.');

    const chat = chats.find((x) => x.id === id);
    if (!chat) throw new NotFoundException('Chat tapılmadı.');

    chat.title = title;
    chat.namedBy = 'Human';
    chat.updatedAt = Date.now();

    ResponseHelper.success(res, chat, 'Chat adı uğurla dəyişdirildi.');
  } catch (error) {
    next(error);
  }
};

// Archive or unarchive chat
export const toggleArchiveChat = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { is_archived } = req.body;
    const chat = chats.find((x) => x.id === id && !x.isDeleted);
    if (!chat) throw new NotFoundException('Chat tapılmadı.');

    chat.isArchived = is_archived;
    chat.updatedAt = Date.now();

    const message = chat.isArchived ? 'Chat arxivə əlavə olundu.' : 'Chat arxivdən çıxarıldı.';

    ResponseHelper.success(res, chat, message);
  } catch (error) {
    next(error);
  }
};

// Delete chat
export const deleteChat = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const chat = chats.find((x) => x.id === id && !x.isDeleted);

    if (!chat) throw new NotFoundException('Chat tapılmadı.');

    chat.isDeleted = true;

    ResponseHelper.success(res, 'Chat uğurla silindi.');
  } catch (error) {
    next(error);
  }
};
