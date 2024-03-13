import { z } from 'zod';

export const notificationSchema = z.object({
  title: z.string({
    required_error: 'Título é um campo obrigatório',
    invalid_type_error: 'Título deve ser uma string',
  }),
  body: z.string({
    required_error: 'Corpo é um campo obrigatório',
    invalid_type_error: 'Corpo deve ser uma string',
  }),
  companiesId: z.array(z.string().uuid(), {
    required_error: 'ID Empresas é um campo obrigatório',
    invalid_type_error: 'ID Empresas deve ser um array de strings',
  }),
});
