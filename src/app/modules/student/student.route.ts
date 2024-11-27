import express, { Request, Response } from 'express';
import { StudentControllers } from './student.controller';

export const router = express.Router();

// will call controller function

router.get('/:id', StudentControllers.getStudent);
router.get('/', StudentControllers.getStudents);

router.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    message: 'Undefined route',
  });
});
export const StudentRoutes = router;
