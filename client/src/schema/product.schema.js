import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(5, { message: "Name is required" }),
  price: z.number().positive("Price must be a positive number"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  brand: z.string().optional(),
  image: z.string(), // Suponiendo que `image` es un archivo
});
export const validateProduct = async (product) => {
  return productSchema.safeParse(product);
};
