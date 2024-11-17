import express, { Request, Response } from 'express';
import { createStudent, getStudent } from './student.controller.js';

export const router = express.Router();

// will call controller function

router.post('/create-student', createStudent);
router.get('/get-student/:id', getStudent);

router.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    message: 'Undefined route',
  });
});
// export const StudentRoutes = router;
