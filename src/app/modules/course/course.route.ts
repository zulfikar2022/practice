import express from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { validateRequest } from '../../middlewares/validateRequest';
import { courseValidations } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(courseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/:id', CourseControllers.getSingleCourse);
router.get('/', CourseControllers.getAllCourses);
router.delete('/:id', CourseControllers.deleteCourse);

export const courseRoute = router;
