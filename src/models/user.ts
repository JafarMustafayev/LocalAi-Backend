// ./src/models/user.ts
export interface User {
  id: string;
  email: string;
  name: string | null;
  passwordHash: string;
  createdAt: number;
  updatedAt: number;
}
