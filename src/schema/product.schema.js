import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(4, { message: "El nombre debe contener al menos 6 cacateres" }),
  price: z.coerce.number({
    required_error: "El nombre debe cont",
    invalid_type_error: "El precio debe ser un número",
  }),
  category: z.string(),
  description: z
    .string()
    .min(5, { message: "El nombre debe contener al menos 6 cacateres" }),
  brand: z.string(),
  image: z.string().optional(),
});

export const validateProduct = (product) => {
  return productSchema.parse(product);
};

export const userUpdateSchema = z.object({
  name: z
    .string()
    .min(4, "El nombre del produto debe contener al menos 5 caracteres o mas")
    .optional(),
  price: z.number().positive().optional(),
  description: z
    .string()
    .min(4, {
      message:
        "La descripción del producto debe contener al menos 5 caracteres o mas",
    })
    .optional(),
});
