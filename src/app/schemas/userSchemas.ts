import { z } from 'zod';

export const userSchema = z.object({
  name: z
    .string({
      required_error: 'Nome é um campo obrigatório',
      invalid_type_error: 'Nome deve ser uma string',
    })
    .trim()
    .min(1, {
      message: 'Nome é um campo obrigatório',
    }),
  email: z
    .string({
      required_error: 'Email é um campo obrigatório',
      invalid_type_error: 'Email deve ser uma string',
    })
    .email({
      message: 'Email não tem um formato válido',
    }),
  role: z
    .enum(['ADMIN', 'USER', 'MANAGER'], {
      invalid_type_error: 'Papel deve ser: ADMIN, USER, MANAGER',
    })
    .default('USER'),
  externalId: z
    .number({
      invalid_type_error: 'ID Externo deve ser um número inteiro',
    })
    .int({ message: 'ID Externo deve ser um número inteiro' })
    .optional(),
  companyId: z
    .string({
      invalid_type_error: 'ID Empresa deve ser uma string',
    })
    .trim()
    .uuid({
      message: 'ID Empresa deve ser um ID válido',
    })
    .optional(),
});

export const userStorePasswordSchema = z
  .string({
    required_error: 'Senha é um campo obrigatório',
    invalid_type_error: 'Senha deve ser uma string',
  })
  .trim()
  .min(1, {
    message: 'Senha é um campo obrigatório',
  });
