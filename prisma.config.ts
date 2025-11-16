import { defineConfig, env } from 'prisma/config';
import config from './src/config/config';

export default defineConfig({
  schema: './prisma/schema',
  migrations: {
    path: 'prisma/migrations',
  },
  engine: 'classic',
  datasource: {
    url: config.databaseUrl,
  },
});
