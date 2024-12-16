import express from 'express';
import { UserControllers } from './user.controller';
import { studentValidations } from '../student/student.validation';
import { validateRequest } from '../../middlewares/validateRequest';
import { facultyValidators } from '../faculty/faculty.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.ADMIN),
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);
router.post(
  '/create-faculty',
  validateRequest(facultyValidators.createFacultyValidation),
  UserControllers.createFaculty,
);

// router.post('/create-admin', validateRequest(), UserControllers.createAdmin);
// router.post('/create-student', UserControllers.createStudent);

export const UserRoutes = router;
