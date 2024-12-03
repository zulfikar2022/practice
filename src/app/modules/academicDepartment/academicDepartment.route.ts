import express from 'express';
import { academicDepartmentControllers } from './academicDepartment.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { validationAcademicDepartment } from './academicDepartment.validation';

const route = express.Router();

route.post(
  '/create-academic-department',
  validateRequest(validationAcademicDepartment.createdAcademicValidationSchema),
  academicDepartmentControllers.createAcademicDepartment,
);

route.get('/', academicDepartmentControllers.getAllAcademicDepartments);

route.get('/:id', academicDepartmentControllers.getSpecificAcademicDepartment);

route.patch(
  '/:id',
  validateRequest(validationAcademicDepartment.updatedAcademicValidationSchema),
  academicDepartmentControllers.updateAcademicDepartment,
);

export const academicDepartmentRoutes = route;
