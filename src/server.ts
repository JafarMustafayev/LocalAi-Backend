// ./src/server.ts
import app from './app';
import configurator from './config';

app.listen(configurator.serverConfig.port, () => {
  console.log(`Server running on port ${configurator.serverConfig.port}`);
});
