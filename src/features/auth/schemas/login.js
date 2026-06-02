import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address").toLowerCase(),
  password: z.string().min(1, "Password is required").max(128),
});

 
