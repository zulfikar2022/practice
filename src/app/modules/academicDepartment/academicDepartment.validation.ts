import { z } from 'zod';
const createdAcademicValidationSchema = z.object({
  name: z.string({
    required_error: 'Department name is required',
  }),
  academicFaculty: z.string({
    required_error: 'Academic Faculty is required',
  }),
});

const updatedAcademicValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Department name is required',
    })
    .optional(),
  academicFaculty: z
    .string({
      required_error: 'Academic Faculty is required',
    })
    .optional(),
});

export const validationAcademicDepartment = {
  createdAcademicValidationSchema,
  updatedAcademicValidationSchema,
};
