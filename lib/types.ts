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

export type MinuteView = {
  minute: string,
  views: number
}

export type HourlyView = {
  hour: string;
  views: number;
}

export type DailyView = {
  day: string;
  views: number;
}

export const nextJsScript = `import Script from "next/script";

<Script
  src="http://localhost:3001/snippet"
  strategy="afterInteractive"
/>
`;

export const htmlScript = `
<script
src="http://localhost:3001/snippet"
>
</script>
`;