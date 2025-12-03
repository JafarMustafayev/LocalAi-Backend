export interface ServerConfig {
  port: number;
  logLevel: string;
  nodeEnv: string;
}

const serverConfig: ServerConfig = {
  port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 3000,
  logLevel: process.env.LOG_LEVEL || 'info',
  nodeEnv: process.env.NODE_ENV || 'development',
};

export default serverConfig;
