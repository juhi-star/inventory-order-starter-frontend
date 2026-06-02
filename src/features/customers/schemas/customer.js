import { z } from "zod";

export const customerFormSchema = z.object({
  full_name: z.string().trim().min(1, "Required").max(120, "Max 120 chars"),
  email: z.string().trim().toLowerCase().pipe(z.string().email("Invalid email")),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9]{7,15}$/, "7-15 digits, optional + prefix"),
});

 
