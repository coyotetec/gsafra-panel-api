import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email é um campo obrigatório',
      invalid_type_error: 'Email deve ser uma string',
    })
    .email({
      message: 'Email não tem uma formato válido',
    }),
  password: z
    .string({
      required_error: 'Senha é um campo obrigatório',
      invalid_type_error: 'Senha deve ser uma string',
    })
    .trim()
    .min(1, {
      message: 'Senha é um campo obrigatório',
    }),
});
