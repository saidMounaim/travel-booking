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
import { bookTourFormSchema, bookTourFormValues } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { bookTour } from "../actions";
import { usePathname, useRouter } from "next/navigation";

interface BookTourFormProps {
  tourId: number;
}

const BookTourForm = ({ tourId }: BookTourFormProps) => {
  const { toast } = useToast();
  const path = usePathname();
  const router = useRouter();

  const form = useForm<bookTourFormValues>({
    resolver: zodResolver(bookTourFormSchema),
  });

  async function onSubmit({ name, email, mobile }: bookTourFormValues) {
    try {
      await bookTour({ tourId, name, email, mobile, path });
      toast({
        className: "bg-green-600 text-white font-semiBold",
        description: "You booked the tour successfully.",
      });
    } catch (error) {
      toast({
        className: "bg-red-600 text-white font-semiBold",
        description: "Something went wrong, please try again.",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 mt-4"
        noValidate
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Phone number" {...field} />
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
          Book Now
        </LoadingButton>
      </form>
    </Form>
  );
};

export default BookTourForm;
