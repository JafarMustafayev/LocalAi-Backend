// ./src/utils/prismaClient.ts
import { PrismaClient } from '../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import config from '../config/config';

let prismaInstance: PrismaClient | null = null;

export const getPrismaClient = () => {
  if (!prismaInstance) {
    const pool = new Pool({ connectionString: config.databaseUrl });
    const adapter = new PrismaPg(pool);

    prismaInstance = new PrismaClient({
      adapter,
      log: config.nodeEnv === 'development' ? ['error', 'warn'] : [],
    });
  }
  return prismaInstance;
};
