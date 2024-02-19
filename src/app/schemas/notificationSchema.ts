import { z } from 'zod';

export const notificationSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a string',
  }),
  body: z.string({
    required_error: 'Body is required',
    invalid_type_error: 'Body must be a string',
  }),
  companiesId: z.array(z.string().uuid()),
});
