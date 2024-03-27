import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'E-mail é um campo obrigatório',
      invalid_type_error: 'E-mail deve ser uma string',
    })
    .email({
      message: 'E-mail não tem uma formato válido',
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

export const userStorePasswordSchema = z.object({
  userId: z
    .string({
      required_error: 'ID do usuário é um campo obrigatório',
      invalid_type_error: 'ID do usuário deve ser uma string',
    })
    .uuid({
      message: 'ID do usuário está em um formato inválido',
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
  token: z
    .string({
      required_error: 'token is a required field',
      invalid_type_error: 'token must be a string',
    })
    .optional(),
});

export const requestResetSchema = z
  .string({
    required_error: 'E-mail é um campo obrigatório',
    invalid_type_error: 'E-mail deve ser uma string',
  })
  .trim()
  .email({
    message: 'Insira um E-mail válido',
  });
