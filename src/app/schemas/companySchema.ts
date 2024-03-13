import { z } from 'zod';

export const companySchema = z.object({
  name: z.string({
    invalid_type_error: 'Nome deve ser uma string',
    required_error: 'Nome é um campo obrigatório',
  }),
  externalId: z
    .string({
      invalid_type_error: 'ID Externo deve ser uma string',
      required_error: 'ID Externo é um campo obrigatório',
    })
    .transform((str) => str.padStart(6, '0')),
});
