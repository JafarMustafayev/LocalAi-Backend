// ./src/services/ChatService.ts
import { ChatRepository } from '../repositories/ChatRepository';
import { PrismaClient } from '../generated/prisma';

export class ChatService {
  private chatRepo: ChatRepository;

  constructor(prisma: PrismaClient) {
    this.chatRepo = new ChatRepository(prisma);
  }

  async createChat(modelId: string, content: string) {
    if (!modelId || !content.trim()) {
      throw new Error('modelId və content tələb olunur');
    }

    const chat = await this.chatRepo.create({
      modelId,
      isArchived: false,
      isDeleted: false,
      messages: {
        create: [
          {
            content,
            role: 'user',
          },
        ],
      },
    });
    return chat;
  }
}
