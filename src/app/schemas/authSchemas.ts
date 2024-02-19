import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'email is a required field',
      invalid_type_error: 'email must be a string',
    })
    .email({
      message: 'email does not have the valid format',
    }),
  password: z
    .string({
      required_error: 'password is a required field',
      invalid_type_error: 'password must be a string',
    })
    .trim()
    .min(1, {
      message: 'password is a required field',
    }),
});
