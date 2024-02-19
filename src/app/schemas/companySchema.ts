import { z } from 'zod';

export const companySchema = z.object({
  name: z.string({
    invalid_type_error: 'Name must be a string',
    required_error: 'Name is required',
  }),
  externalId: z
    .string({
      invalid_type_error: 'externalId must be a string',
      required_error: 'externalId is required',
    })
    .transform((str) => str.padStart(6, '0')),
});
