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

const validImageFile = z
  .custom<File | undefined>()
  .refine((file) => file, "Image is required")
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file"
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

export const createTourFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(300),
  body: z.string().min(1, "Description is required"),
<<<<<<< HEAD
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date(),
=======
  checkIn: z.date({ required_error: "Check In is required" }),
  checkOut: z.date({ required_error: "Check Out is required" }),
>>>>>>> c568ff34843962cef4d804fd1a23bfedcc83feb1
  guests: z.string().min(1),
  pricePerNight: z.string().min(1),
  feauturedImage: validImageFile,
  galleryTour: z.array(
    z.object({
      titleGallery: z
        .custom<string | undefined>()
        .refine((str) => str, "Title of image is required"),
      imageGallery: validImageFile,
    })
  ),
});
<<<<<<< HEAD
=======

>>>>>>> c568ff34843962cef4d804fd1a23bfedcc83feb1
export type createTourFormValues = z.infer<typeof createTourFormSchema>;
