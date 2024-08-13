import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string({
      required_error: "El email es requerido",
      invalid_type_error: "El email debe ser un string",
    })
    .email(),
  password: z.string().min(6, {
    message: "email or password incorrect",
    refinement_error: "email or password incorrect",
  }),
});
