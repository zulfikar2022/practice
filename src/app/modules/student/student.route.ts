import express, { Request, Response } from 'express';
import {
  createStudent,
  getStudent,
  getStudents,
} from './student.controller.js';

export const router = express.Router();

// will call controller function

router.post('/create-student', createStudent);
router.get('/:id', getStudent);
router.get('/', getStudents);

router.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    message: 'Undefined route',
  });
});
// export const StudentRoutes = router;
