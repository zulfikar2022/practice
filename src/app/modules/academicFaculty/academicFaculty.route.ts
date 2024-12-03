import express from 'express';
import { academicFacultyControllers } from './academicFaculty.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { academicFacultyValidations } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    academicFacultyValidations.createAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.createAcademicFaculty,
);

router.patch(
  '/update-academic-faculty/:id',
  validateRequest(
    academicFacultyValidations.updateAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.updateAcademicFaculty,
);
router.get('/', academicFacultyControllers.getAllAcademicFaculties);

router.get('/:id', academicFacultyControllers.getSingleAcademicFaculty);

export const academicFacultyRoutes = router;
