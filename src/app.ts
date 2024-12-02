import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes/index.js';

export const app: Application = express();
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1/', router);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send({ message: 'success fully received message' });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error?.status || 500).send({
    success: false,
    message: error.message,
    error: error,
  });
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).send({ message: 'Route not found', data: '' });
});
