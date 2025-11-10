// ./src/models/chat.ts
import type { Message } from './message';

export interface Chat {
  id: string;
  title: string;
  modelId: string;
  createdAt: number;
  updatedAt: number;
  isArchived: boolean;
  isDeleted: boolean;
  namedBy: 'Human' | 'Assistant';
  messages?: Message[];
}

export var chats: Chat[] = [
  {
    id: '9c23ae6c-f3c8-42ef-8496-c17c59b8e018',
    title: 'testing',
    modelId: '6dcf0f93-9837-4a16-88a9-d9572acb2cd0',
    createdAt: 1762775677112,
    updatedAt: 1762775677112,
    isArchived: false,
    isDeleted: false,
    namedBy: 'Human',
    messages: [],
  },
];
