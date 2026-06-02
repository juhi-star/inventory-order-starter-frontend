import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().trim().min(1, "Required").max(120, "Max 120 chars"),
  sku: z
    .string()
    .trim()
    .transform((v) => v.toUpperCase())
    .pipe(z.string().regex(/^[A-Z0-9-]{3,32}$/, "3-32 chars: A-Z, 0-9, dash")),
  price: z.coerce.number().nonnegative("Must be >= 0").multipleOf(0.01, "Max 2 decimals"),
  qty: z.coerce.number().int("Must be an integer").nonnegative("Must be >= 0"),
});

 
