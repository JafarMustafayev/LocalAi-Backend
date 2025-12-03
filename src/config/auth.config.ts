import dotenv from 'dotenv';

export interface AuthConfig {
  accessTokenSecret: string;
  refreshTokenSecret: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}

dotenv.config();

const autfConfig: AuthConfig = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'accessTokenSecret',

  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'refreshTokenSecret',

  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
    ? parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN, 10)
    : 15,

  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
    ? parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN, 10)
    : 30,
};

export default autfConfig;
