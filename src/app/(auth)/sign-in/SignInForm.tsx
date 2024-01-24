"use client";

import LoadingButton from "@/components/shared/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { signInFormValues, signInFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const SignInForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<signInFormValues>({
    resolver: zodResolver(signInFormSchema),
  });

  async function onSubmit(values: signInFormValues) {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (!result?.ok) {
        console.log("first");
        toast({
          className: "bg-red-600 text-white text-md font-medium",
          title: "Email or Password Invalid",
        });
      }
      if (result?.ok) {
        toast({
          className: "bg-green-600 text-md text-white font-medium",
          title: "User has been logged in successfully",
        });
        router.push("/user/profile");
        router.refresh();
      }
      console.log(result);
    } catch (error) {
      toast({
        className: "bg-red-600 text-white text-md font-medium",
        title: "Something went wrong please try again.",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          type="submit"
          className="bg-blue-700 hover:bg-blue-800"
          loading={form.formState.isSubmitting}
        >
          Sign in
        </LoadingButton>
      </form>
    </Form>
  );
};

export default SignInForm;
