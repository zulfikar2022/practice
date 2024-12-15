import { z } from 'zod';
const loginValidationSchema = z
  .object({
    id: z.string({ required_error: 'User ID is required' }),
    password: z.string({ required_error: 'Password is required' }),
  })
  .strict();

export const AuthValidation = {
  loginValidationSchema,
};
