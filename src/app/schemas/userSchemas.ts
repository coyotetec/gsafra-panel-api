import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string({
      required_error: "Nome é um campo obrigatório",
      invalid_type_error: "Nome deve ser uma string",
    })
    .trim()
    .min(1, {
      message: "Nome é um campo obrigatório",
    }),
  email: z
    .string({
      required_error: "E-mail é um campo obrigatório",
      invalid_type_error: "E-mail deve ser uma string",
    })
    .email({
      message: "E-mail não tem um formato válido",
    }),
  idPapel: z.number().min(1, {
    message: "Id papel é obrigatório",
  }),
  role: z
    .enum(["ADMIN", "USER", "MANAGER"], {
      invalid_type_error: "Papel deve ser: ADMIN, USER, MANAGER",
    })
    .default("USER"),
  externalId: z
    .number({
      invalid_type_error: "ID Externo deve ser um número inteiro",
    })
    .int({ message: "ID Externo deve ser um número inteiro" })
    .optional(),
  companyId: z
    .string({
      invalid_type_error: "ID Empresa deve ser uma string",
    })
    .trim()
    .uuid({
      message: "ID Empresa deve ser um ID válido",
    })
    .optional(),
});

export const userStoreSchema = z.union([userSchema, z.array(userSchema)]);
