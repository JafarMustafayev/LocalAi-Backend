// ./src/models/message.ts
export interface Message {
  id: string;
  chatId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  isThinking?: boolean;
  reaction?: 'like' | 'dislike';
}

export let mesages: Message[] = [];
