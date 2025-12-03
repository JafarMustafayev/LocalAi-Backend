import { defineConfig, env } from 'prisma/config';
import configurator from './src/config/';

export default defineConfig({
  schema: './prisma/schema',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: configurator.dbConfig.databaseUrl,
  },
});
