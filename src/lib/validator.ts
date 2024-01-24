import * as z from "zod";

export const signInFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is not valid"),
  password: z.string().min(1, "Passowrd is required"),
});

export type signInFormValues = z.infer<typeof signInFormSchema>;

export const signUpFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Email is not valid"),
  password: z.string().min(1, "Passowrd is required"),
  mobile: z.string().min(1, "Mobile is required").max(20),
});

export type signUpFormValues = z.infer<typeof signUpFormSchema>;
