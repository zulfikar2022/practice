import express, { Request, Response } from 'express';
import { StudentControllers } from './student.controller';
import { requestValidator } from '../../middlewares/validatorMiddleware';
import { validateRequest } from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
export const router = express.Router();

// will call controller function

router.get(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.STUDENT),
  requestValidator,
  StudentControllers.getStudent,
);
router.get('/', auth(USER_ROLE.ADMIN), StudentControllers.getStudents);
router.delete('/:id', auth(USER_ROLE.ADMIN), StudentControllers.deleteStudent);
router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN),
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
