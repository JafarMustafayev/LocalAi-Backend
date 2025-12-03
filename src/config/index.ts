import dotenv from 'dotenv';
import autfConfig, { AuthConfig } from './auth.config';
import serverConfig, { ServerConfig } from './server.config';
import dbConfig, { DbConfig } from './db.config';

dotenv.config();

interface Configurator {
  authConfig: AuthConfig;
  serverConfig: ServerConfig;
  dbConfig: DbConfig;
}

const configurator: Configurator = {
  authConfig: autfConfig,
  serverConfig: serverConfig,
  dbConfig: dbConfig,
};

export default configurator;
