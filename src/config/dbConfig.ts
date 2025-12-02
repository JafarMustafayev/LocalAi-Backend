export interface DbConfig {
  databaseUrl: string;
}

const dbConfig: DbConfig = {
  databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/myapp',
};

export default dbConfig;
