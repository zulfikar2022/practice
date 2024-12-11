import { string, z } from 'zod';
import { semesterRegistrationStatus } from './semesterRegistration.constants';

const createSemesterRegistrationValidationSchema = z
  .object({
    academicSemester: z.string(),
    status: z.enum(semesterRegistrationStatus as [string, ...string[]]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  })
  .strict();

export const SemesterRegistrationValidation = {
  createSemesterRegistrationValidationSchema,
};
