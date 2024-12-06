import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes/index.js';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler.js';

export const app: Application = express();
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1/', router);

const test = async (req: Request, res: Response) => {
  Promise.reject();
};

// test route
app.get('/', test);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  globalErrorHandler(error, req, res, next);
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).send({ message: 'Route not found', data: '' });
});
