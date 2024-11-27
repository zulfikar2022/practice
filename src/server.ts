import mongoose from 'mongoose';
import { app } from './app';
import config from './app/config/index.js';

mongoose
  .connect(config.database_url as string)
  .then(() => {
    console.log('database connected successfully');
    app.listen(config.port, () => {
      console.log('server is running', config.port);
    });
  })
  .catch((error: any) => {
    console.log('database connection failed');
    console.log('error message: ', error.message);
  });
