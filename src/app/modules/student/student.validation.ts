import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string(),
  lastName: z.string(),
});

const guardianValidationSchema = z.object({
  fathersName: z.string(),
  fathersOccupation: z.string(),
  fathersContactNumber: z.string(),
  mothersName: z.string(),
  mothersOccupation: z.string(),
  mothersContactNumber: z.string(),
});

const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const createStudentValidationSchema = z.object({
  password: z.string(),
  student: z
    .object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNumber: z.string(),
      emergencyContactNumber: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImage: z.string(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    })
    .strict(),
});

const updateStudentValidationSchema = z
  .object({
    name: userNameValidationSchema.optional(),
    contactNumber: z.string().optional(),
    emergencyContactNumber: z.string().optional(),
    presentAddress: z.string().optional(),
    guardian: guardianValidationSchema.optional(),
    localGuardian: localGuardianValidationSchema.optional(),
    profileImage: z.string().optional(),
    academicDepartment: z.string().optional(),
  })
  .strict();

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
