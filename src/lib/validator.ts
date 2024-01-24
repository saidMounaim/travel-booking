import * as z from "zod";

export const signInFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is not valid"),
  password: z.string().min(1, "Passowrd is required"),
});

export type signInFormValues = z.infer<typeof signInFormSchema>;
