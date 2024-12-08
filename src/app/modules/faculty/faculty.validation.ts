import { z } from 'zod';
import {
  createUserNameValidationSchema,
  updateUsernameValidationSchema,
} from '../student/student.validation';

const createFacultyValidation = z
  .object({
    password: z.string(),
    faculty: z
      .object({
        name: createUserNameValidationSchema,
        designation: z.enum(
          [
            'lecturer',
            'assistant professor',
            'associate professor',
            'professor',
          ],
          { message: 'Invalid designation' },
        ),
        gender: z.enum(['male', 'female', 'other'], {
          message: 'Invalid gender',
        }),
        dateOfBirth: z.string().optional(),
        email: z.string().email(),
        contactNumber: z.string(),
        emergencyContactNumber: z.string(),
        presentAddress: z.string(),
        permanentAddress: z.string(),
        profileImage: z.string(),
        academicFaculty: z.string(),
        academicDepartment: z.string(),
      })
      .strict(),
  })
  .strict();

const updateFacultyValidation = z.object({
  name: updateUsernameValidationSchema,
  designation: z
    .enum(
      ['lecturer', 'assistant professor', 'associate professor', 'professor'],
      { message: 'Invalid designation' },
    )
    .optional(),
  gender: z
    .enum(['male', 'female', 'other'], { message: 'Invalid gender' })
    .optional(),
  dateOfBirth: z.string().optional(),
  contactNumber: z.string().optional(),
  emergencyContactNumber: z.string().optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  profileImage: z.string().optional(),
  academicFaculty: z.string().optional(),
  academicDepartment: z.string().optional(),
});

export const facultyValidators = {
  createFacultyValidation,
  updateFacultyValidation,
};
