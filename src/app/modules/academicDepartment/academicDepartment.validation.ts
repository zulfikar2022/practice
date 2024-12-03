import { z } from 'zod';
const createdAcademicValidationSchema = z.object({
  name: z.string({
    required_error: 'Department name is required',
  }),
  academicFaculty: z.string({
    required_error: 'Academic Faculty is required',
  }),
});
