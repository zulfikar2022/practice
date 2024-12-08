import express from 'express';
import { UserControllers } from './user.controller';
import { studentValidations } from '../student/student.validation';
import { validateRequest } from '../../middlewares/validateRequest';
import { facultyValidators } from '../faculty/faculty.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);
router.post(
  '/create-faculty',
  validateRequest(facultyValidators.createFacultyValidation),
  UserControllers.createFaculty,
);

// router.post('/create-student', UserControllers.createStudent);

export const UserRoutes = router;
