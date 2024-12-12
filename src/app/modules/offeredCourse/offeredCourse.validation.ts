import { string, z } from 'zod';
import { Days } from './offeredCourse.constants';
const createOfferedCourseValidationSchema = z
  .object({
    semesterRegistration: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number(),
    section: z.number(),
    days: z.enum([...Days] as [string, ...string[]]),
    startTime: string(),
    endTime: string(),
  })
  .strict();

const updateOfferedCourseValidationSchema = z
  .object({
    faculty: z.string().optional(),
    maxCapacity: z.number().optional(),
    days: z.enum([...Days] as [string, ...string[]]).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  })
  .strict();

export const OfferedCourseValidation = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
