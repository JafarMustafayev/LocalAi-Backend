import dotenv from 'dotenv';
import autfConfig, { AuthConfig } from './authConfig';
import serverConfig, { ServerConfig } from './serverConfig';
import dbConfig, { DbConfig } from './dbConfig';

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
