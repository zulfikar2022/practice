import { z } from 'zod';
const preRequisiteCourseCreateValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});
// const preRequisiteCourseUpdateValidationSchema = z.object({
//   course: z.string().optional(),
//   isDeleted: z.boolean().optional(),
// });
const createCourseValidationSchema = z.object({
  title: z.string(),
  prefix: z.string(),
  code: z.number(),
  credits: z.number(),
  preRequisiteCourses: z
    .array(preRequisiteCourseCreateValidationSchema)
    .optional(),
});
const updateCourseValidationSchema = z.object({
  title: z.string().optional(),
  prefix: z.string().optional(),
  code: z.number().optional(),
  credits: z.number().optional(),
  preRequisiteCourses: z
    .array(preRequisiteCourseCreateValidationSchema)
    .optional(),
});

export const courseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
