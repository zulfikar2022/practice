import { z } from 'zod';

export const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().optional(),
  lastName: z.string(),
});

export const updateUsernameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const createGuardianValidationSchema = z.object({
  fathersName: z.string(),
  fathersOccupation: z.string(),
  fathersContactNumber: z.string(),
  mothersName: z.string(),
  mothersOccupation: z.string(),
  mothersContactNumber: z.string(),
});
const updateGuardianValidationSchema = z.object({
  fathersName: z.string().optional(),
  fathersOccupation: z.string().optional(),
  fathersContactNumber: z.string().optional(),
  mothersName: z.string().optional(),
  mothersOccupation: z.string().optional(),
  mothersContactNumber: z.string().optional(),
});

const createLocalGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

const createStudentValidationSchema = z.object({
  password: z.string(),
  student: z
    .object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNumber: z.string(),
      emergencyContactNumber: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      profileImage: z.string(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    })
    .strict(),
});

const updateStudentValidationSchema = z
  .object({
    name: updateUsernameValidationSchema.optional(),
    contactNumber: z.string().optional(),
    emergencyContactNumber: z.string().optional(),
    presentAddress: z.string().optional(),
    guardian: updateGuardianValidationSchema.optional(),
    localGuardian: updateLocalGuardianValidationSchema.optional(),
    profileImage: z.string().optional(),
    academicDepartment: z.string().optional(),
  })
  .strict();

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
