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

export const formSchemaAddWebsite = z.object({
  domain: z
    .string()
    .min(3, "Domain must be at least 3 characters.")
    .max(32, "Domain must be at most 32 characters."),
  about: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(40, "Description must be at most 30 characters."),
})


export type User = {
  name: string;
  email: string;
};

export type HourlyView = {
  hour: string;
  views: number;
}