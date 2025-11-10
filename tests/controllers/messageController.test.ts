import { Request, Response, NextFunction } from 'express';
import * as chatController from '../../src/controllers/chatController';
import { chats, Chat } from '../../src/models/chat';
import { ResponseHelper } from '../../src/utils/responseHelper';
import { NotFoundException, BadRequestException } from '../../src/exceptions/customExceptions';

// 🔧 ResponseHelper-i mock edirik ki, real HTTP çağırışı olmasın
jest.mock('../../src/utils/responseHelper', () => ({
  ResponseHelper: {
    success: jest.fn(),
  },
}));

describe('Chat Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    chats.length = 0;
    mockRequest = {};
    mockResponse = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  describe('getChats', () => {
    it('bütün aktiv chat-ləri qaytarmalıdır', () => {
      chats.push(
        {
          id: '1',
          title: 'Chat 1',
          modelId: 'm1',
          createdAt: 1,
          updatedAt: 1,
          isArchived: false,
          isDeleted: false,
          namedBy: 'Assistant',
        },
        {
          id: '2',
          title: 'Chat 2',
          modelId: 'm2',
          createdAt: 1,
          updatedAt: 1,
          isArchived: false,
          isDeleted: true,
          namedBy: 'Human',
        }
      );

      chatController.getChats(mockRequest as Request, mockResponse as Response, mockNext);

      expect(ResponseHelper.success).toHaveBeenCalledWith(
        mockResponse,
        [chats[0]],
        'The data was successfully fetched.'
      );
    });

    it('xəta baş verdikdə next() çağırmalıdır', () => {
      (ResponseHelper.success as jest.Mock).mockImplementation(() => {
        throw new Error('Fake error');
      });

      chatController.getChats(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getChat', () => {
    it('mövcud chat-ı qaytarmalıdır', () => {
      const chat: Chat = {
        id: '123',
        title: 'Test Chat',
        modelId: 'gpt-4',
        createdAt: 1,
        updatedAt: 1,
        isArchived: false,
        isDeleted: false,
        namedBy: 'Assistant',
      };
      chats.push(chat);

      mockRequest = { params: { id: '123' } };

      chatController.getChat(mockRequest as Request, mockResponse as Response, mockNext);

      expect(ResponseHelper.success).toHaveBeenCalledWith(
        mockResponse,
        chat,
        'The data was successfully fetched.'
      );
    });

    it('chat tapılmadıqda NotFoundException atmalıdır', () => {
      mockRequest = { params: { id: 'notfound' } };

      chatController.getChat(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(NotFoundException));
    });
  });

  describe('createNewChat', () => {
    it('yeni chat yaradılmalıdır', () => {
      mockRequest = {
        body: { content: 'salam', modelId: '123e4567-e89b-12d3-a456-426614174000' },
      };

      chatController.createNewChat(mockRequest as Request, mockResponse as Response, mockNext);

      expect(chats.length).toBe(1);
      expect(chats[0].messages?.length).toBe(1);
      expect(ResponseHelper.success).toHaveBeenCalledWith(
        mockResponse,
        expect.any(Object),
        'Chat uğurla yaradıldı.'
      );
    });

    it('content və ya modelId olmadıqda BadRequestException atmalıdır', () => {
      mockRequest = { body: { content: '', modelId: '' } };

      chatController.createNewChat(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(BadRequestException));
    });
  });

  describe('renameChat', () => {
    it('chat başlığını dəyişməlidir', () => {
      chats.push({
        id: '1',
        title: 'Old Title',
        modelId: 'm',
        createdAt: 1,
        updatedAt: 1,
        isArchived: false,
        isDeleted: false,
        namedBy: 'Assistant',
      });

      mockRequest = { params: { id: '1' }, body: { title: 'New Title' } };

      chatController.renameChat(mockRequest as Request, mockResponse as Response, mockNext);

      expect(chats[0].title).toBe('New Title');
      expect(chats[0].namedBy).toBe('Human');
      expect(ResponseHelper.success).toHaveBeenCalledWith(
        mockResponse,
        chats[0],
        'Chat adı uğurla dəyişdirildi.'
      );
    });

    it('title göndərilmədikdə BadRequestException atmalıdır', () => {
      mockRequest = { params: { id: '1' }, body: {} };

      chatController.renameChat(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(BadRequestException));
    });

    it('chat tapılmadıqda NotFoundException atmalıdır', () => {
      mockRequest = { params: { id: '999' }, body: { title: 'New Title' } };

      chatController.renameChat(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(NotFoundException));
    });
  });

  describe('toggleArchiveChat', () => {
    it('chat-ı arxivə əlavə etməlidir', () => {
      chats.push({
        id: '10',
        title: 'Archivable',
        modelId: 'm',
        createdAt: 1,
        updatedAt: 1,
        isArchived: false,
        isDeleted: false,
        namedBy: 'Assistant',
      });

      mockRequest = { params: { id: '10' }, body: { is_archived: true } };

      chatController.toggleArchiveChat(mockRequest as Request, mockResponse as Response, mockNext);

      expect(chats[0].isArchived).toBeTruthy();
      expect(ResponseHelper.success).toHaveBeenCalledWith(
        mockResponse,
        chats[0],
        'Chat arxivə əlavə olundu.'
      );
    });

    it('chat tapılmadıqda NotFoundException atmalıdır', () => {
      mockRequest = { params: { id: '404' }, body: { is_archived: false } };

      chatController.toggleArchiveChat(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(NotFoundException));
    });
  });

  describe('deleteChat', () => {
    it('mövcud chat-ı silməlidir', () => {
      chats.push({
        id: '55',
        title: 'Deletable',
        modelId: 'm',
        createdAt: 1,
        updatedAt: 1,
        isArchived: false,
        isDeleted: false,
        namedBy: 'Assistant',
      });

      mockRequest = { params: { id: '55' } };

      chatController.deleteChat(mockRequest as Request, mockResponse as Response, mockNext);

      expect(chats[0].isDeleted).toBeTruthy();
      expect(ResponseHelper.success).toHaveBeenCalledWith(mockResponse, 'Chat uğurla silindi.');
    });

    it('chat tapılmadıqda NotFoundException atmalıdır', () => {
      mockRequest = { params: { id: '404' } };

      chatController.deleteChat(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(NotFoundException));
    });
  });
});
