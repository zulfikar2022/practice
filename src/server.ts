import mongoose from 'mongoose';
import { app } from './app';
import config from './app/config/index.js';
import { Server } from 'http';

let server: Server;

mongoose
  .connect(config.database_url as string)
  // .connect('mongodb://localhost:27017/phUniversity')
  .then(() => {
    console.log('database connected successfully');
    // console.log(`database name: ${mongoose.connection}`);
    console.log(mongoose.connection.name);
    server = app.listen(config.port, () => {
      console.log('server is running', config.port);
    });
  })
  .catch((error: any) => {
    console.log('database connection failed');
    console.log('error message: ', error.message);
  });

process.on('unhandledRejection', (error: any) => {
  // console.log('unhandledRejection', error.message);
  console.log('unhandledRejection');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on('uncaughtException', (error: any) => {
  console.log('uncaughtException');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});
