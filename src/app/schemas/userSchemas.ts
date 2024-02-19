import { z } from 'zod';

export const userSchema = z.object({
  name: z
    .string({
      required_error: 'name is a required field',
      invalid_type_error: 'name must be a string',
    })
    .trim()
    .min(1, {
      message: 'name is a required field',
    }),
  email: z
    .string({
      required_error: 'email is a required field',
      invalid_type_error: 'email must be a string',
    })
    .email({
      message: 'email does not have the valid format',
    }),
  role: z
    .enum(['ADMIN', 'USER', 'MANAGER'], {
      invalid_type_error: 'role must be: ADMIN, USER',
    })
    .default('USER'),
  externalId: z
    .number({
      invalid_type_error: 'externalId must be an integer number',
    })
    .int({ message: 'externalId must be an integer number' })
    .optional(),
});

export const userStorePasswordSchema = z
  .string({
    required_error: 'password is a required field',
    invalid_type_error: 'password must be a string',
  })
  .trim()
  .min(1, {
    message: 'password is a required field',
  });
