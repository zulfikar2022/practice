import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { router } from './app/modules/student/student.route.js';

export const app: Application = express();
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1/students', router);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send({ message: 'success fully received message' });
});
