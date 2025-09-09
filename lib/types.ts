import { z } from "zod";

export const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, { error: "Minimum length 8"}).max(16, { error: "Maximum length 16"})
})