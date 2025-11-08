// ./tests/controllers/chatController.test.ts
import { Request, Response, NextFunction } from 'express';
import { chatController } from '../../src/controllers';
import { chats, Chat } from '../../src/models/chat';

describe('Chat Controller', () => {
  // Mock Request, Response və NextFunction
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    // Hər testdən əvvəl chats array-ini təmizləyirik
    chats.length = 0;
    mockRequest = {};
    mockResponse = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getChats', () => {
    it('boş chats array-i qaytarmalıdır', () => {
      chatController.getChats(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.json).toHaveBeenCalledTimes(1);
      expect(mockResponse.json).toHaveBeenCalledWith([]);
    });

    it('chats array-indəki bütün chat-ləri qaytarmalıdır', () => {
      const testChats: Chat[] = [
        {
          id: '1',
          title: 'Chat 1',
          modelId: 'gpt-4',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          isArchived: false,
          namedBy: 'Human',
        },
        {
          id: '2',
          title: 'Chat 2',
          modelId: 'gpt-3.5',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          isArchived: false,
          namedBy: 'Asistan',
        },
      ];

      chats.push(...testChats);

      chatController.getChats(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.json).toHaveBeenCalledTimes(1);
      expect(mockResponse.json).toHaveBeenCalledWith(testChats);
    });

    it('xəta baş verdikdə next() funksiyasını çağırmalıdır', () => {
      // json funksiyasını xəta atması üçün mock edirik
      mockResponse.json = jest.fn().mockImplementation(() => {
        throw new Error('Test Error');
      });

      chatController.getChats(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });

    it('response obyektinin json metodunu düzgün çağırmalıdır', () => {
      const testChat: Chat = {
        id: '1',
        title: 'Test Chat',
        modelId: 'gpt-4',
        createdAt: 1234567890,
        updatedAt: 1234567890,
        isArchived: false,
        namedBy: 'Human',
        messages: [
          {
            id: 'm1',
            chatId: '1',
            role: 'user',
            content: 'Test message',
            timestamp: 1234567890,
          },
        ],
      };

      chats.push(testChat);

      chatController.getChats(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.json).toHaveBeenCalledWith([testChat]);
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('try-catch bloku düzgün işləməlidir', () => {
      // Response obyektini null olaraq təyin edirik ki, xəta yaratsın
      const invalidResponse = null as unknown as Response;

      expect(() => {
        chatController.getChats(mockRequest as Request, invalidResponse, mockNext);
      }).not.toThrow();

      expect(mockNext).toHaveBeenCalled();
    });
  });
});
