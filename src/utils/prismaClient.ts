// ./src/utils/prismaClient.ts
import { PrismaClient } from '../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import configurator from '../config/';

let prismaInstance: PrismaClient | null = null;

export const getPrismaClient = () => {
  if (!prismaInstance) {
    const pool = new Pool({ connectionString: configurator.dbConfig.databaseUrl });
    const adapter = new PrismaPg(pool);

    prismaInstance = new PrismaClient({
      adapter,
      log: configurator.serverConfig.nodeEnv === 'development' ? ['error', 'warn'] : [],
    });
  }
  return prismaInstance;
};
