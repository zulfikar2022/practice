import { z } from 'zod';
const loginValidationSchema = z
  .object({
    id: z.string({ required_error: 'User ID is required' }),
    password: z.string({ required_error: 'Password is required' }),
  })
  .strict();

const changePasswordValidationSchema = z.object({
  oldPassword: z.string({ required_error: 'Old password is required' }),
  newPassword: z.string({ required_error: 'New password is required' }),
  confirmPassword: z.string({ required_error: 'Confirm password is required' }),
});

const forgetPasswordValidationSchema = z.object({
  id: z.string({ required_error: 'User ID is required' }),
});

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
  forgetPasswordValidationSchema,
};
