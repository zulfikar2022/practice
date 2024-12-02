import { z } from 'zod';

const createAcademicFacultyValidationSchema = z
  .object({
    name: z.string({
      invalid_type_error: 'Academic Faculty Name must be a string',
    }),
  })
  .strict();
const updateAcademicFacultyValidationSchema = z
  .object({
    name: z.string({
      invalid_type_error: 'Academic Faculty Name must be a string',
    }),
  })
  .strict();

export const academicFacultyValidations = {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
};
