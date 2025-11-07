import dotenv from 'dotenv';

interface Config {
  port: number;
  databaseUrl: string;
  jwtSecret: string;
  logLevel: string;
}

dotenv.config();

const config: Config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/myapp',
  jwtSecret: process.env.JWT_SECRET || 'defaultsecret',
  logLevel: process.env.LOG_LEVEL || 'info',
};

export default config;
