import { z } from "zod";

export const formSchemaSignUp = z.object({
  name: z.string().max(50, { error: "Name cannot exceed 50 characters" }),
  email: z.email(),
  password: z
    .string()
    .min(8, { error: "Minimum length 8" })
    .max(16, { error: "Maximum length 16" }),
});

export const formSchemaSignIn = z.object({
  email: z.email(),
  password: z.string(),
});

export type User = {
  name: string;
  email: string;
};
