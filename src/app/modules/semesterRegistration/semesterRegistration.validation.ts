import { string, z } from 'zod';
import { semesterRegistrationStatus } from './semesterRegistration.constants';

const createSemesterRegistrationValidationSchema = z
  .object({
    academicSemester: z.string(),
    status: z
      .enum(semesterRegistrationStatus as [string, ...string[]])
      .optional(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  })
  .strict();

const updateSemesterRegistrationValidationSchema = z
  .object({
    academicSemester: z.string().optional(),
    status: z
      .enum(semesterRegistrationStatus as [string, ...string[]])
      .optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  })
  .strict();

export const SemesterRegistrationValidation = {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
};
