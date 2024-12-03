import express from 'express';
import { AcademicDepartment } from './academicDepartment.model';
import { academicDepartmentControllers } from './academicDepartment.controller';

const route = express.Router();

route.post(
  '/create-academic-department',
  academicDepartmentControllers.createAcademicDepartment,
);

route.get('/', academicDepartmentControllers.getAllAcademicDepartments);

route.get('/:id', academicDepartmentControllers.getSpecificAcademicDepartment);

export const academicDepartmentRoutes = route;
