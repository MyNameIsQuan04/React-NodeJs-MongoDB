import { z } from "zod";

const productSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  price: z.number().nonnegative("Price must be a positive number"),
  description: z.string().optional(),
  thumbnail: z.any().optional(),
  stock: z.number().nonnegative("Stock must be a positive number"),
  rate: z.number().nonnegative("Rate must be a positive number"),
});

export default productSchema;
