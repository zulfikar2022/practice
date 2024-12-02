import express, { Request, Response } from 'express';
import { StudentControllers } from './student.controller';
import { requestValidator } from '../../middlewares/validatorMiddleware';
import { validateRequest } from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';
export const router = express.Router();

// will call controller function

router.get('/:id', requestValidator, StudentControllers.getStudent);
router.get('/', requestValidator, StudentControllers.getStudents);
router.delete('/:id', StudentControllers.deleteStudent);
router.put(
  '/:id',
  requestValidator,
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    message: 'Undefined route',
  });
});
export const StudentRoutes = router;
