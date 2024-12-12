import express from 'express';
import { OfferedCourseControllers } from './semesterRegistration.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { OfferedCourseValidation } from './offeredCourse.validation';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

export const offeredCourseRoute = router;
