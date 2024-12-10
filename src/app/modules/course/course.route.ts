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

router.get('/', CourseControllers.getAllCourses);
router.get('/:id', CourseControllers.getSingleCourse);
router.delete('/:id', CourseControllers.deleteCourse);
router.patch(
  '/:id',
  validateRequest(courseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);
router.put(
  '/:courseID/assign-faculties',
  validateRequest(courseValidations.assignFacultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

export const courseRoute = router;
