// ./src/models/chat.ts
import { Message } from './message';

export interface Chat {
  id: string;
  title: string;
  modelId: string;
  createdAt: number;
  updatedAt: number;
  isArchived: boolean;
  namedBy: 'Human' | 'Asistan';
  messages?: Message[];
}

export var chats: Chat[] = [];
