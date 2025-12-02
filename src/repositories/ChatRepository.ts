// ./src/repositories/ChatRepository.ts
import { BaseRepository } from './BaseRepository';
import { PrismaClient, ChatSessions } from '../generated/prisma';

export class ChatRepository extends BaseRepository<ChatSessions, PrismaClient['chatSessions']> {
  constructor(prisma: PrismaClient) {
    super(prisma.chatSessions, prisma);
  }

  findPagedChats(page: number, take: number, isArchived: boolean) {
    return this.model.findMany({
      skip: (page - 1) * take,
      take,
      where: {
        isArchived,
        isDeleted: false,
      },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
