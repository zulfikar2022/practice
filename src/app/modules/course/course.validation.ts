import { z } from 'zod';
const preRequisiteCourseCreateValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z
  .object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z
      .array(preRequisiteCourseCreateValidationSchema)
      .optional(),
    isDeleted: z.boolean().optional(),
  })
  .strict();
const updateCourseValidationSchema = createCourseValidationSchema
  .partial()
  .strict();

const assignFacultiesWithCourseValidationSchema = z.object({
  faculties: z.array(z.string()),
});

export const courseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  assignFacultiesWithCourseValidationSchema,
};
