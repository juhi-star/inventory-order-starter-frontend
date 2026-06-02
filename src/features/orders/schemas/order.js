import { z } from "zod";

export const orderLineSchema = z.object({
  product_id: z.string().min(1, "Pick a product"),
  qty: z.coerce.number().int("Must be an integer").min(1, "At least 1"),
});

export const orderFormSchema = z.object({
  customer_id: z.string().min(1, "Pick a customer"),
  lines: z.array(orderLineSchema).min(1, "Add at least one line"),
});

 

