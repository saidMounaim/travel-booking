"use server";

import { toSlug } from "@/lib/utils";
import { createTourFormSchema } from "@/lib/validator";
import { nanoid } from "nanoid";
import path from "path";
import { put } from "@vercel/blob";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function createTour(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const values = Object.entries(formData.entries());

  const {
    title,
    body,
    checkIn,
    checkOut,
    guests,
    feauturedImage,
    pricePerNight,
    galleryTour,
  } = createTourFormSchema.parse(values);

  const slug = `${toSlug(title)}-${nanoid(10)}`;

  let imageTour: string | undefined = "";

  if (feauturedImage) {
    const blob = await put(
      `featured/${slug}${path.extname(feauturedImage.name)}`,
      feauturedImage,
      {
        access: "public",
        addRandomSuffix: false,
      }
    );
    imageTour = blob.url;
  }

  const tour = await prisma.tour.create({
    data: {
      title,
      slug,
      body,
      checkIn,
      checkOut,
      guests: parseInt(guests),
      pricePerNight: parseInt(pricePerNight),
      feauturedImage: imageTour,
      userId: session?.user.id,
    },
  });

  if (galleryTour) {
    galleryTour.forEach(async (gallery: any) => {
      const blob = await put(
        `places/${slug}${path.extname(gallery?.imageGallery?.name)}`,
        gallery?.imageGallery,
        {
          access: "public",
          addRandomSuffix: false,
        }
      );

      await prisma.gallery.create({
        data: {
          title: gallery.titleGallery as string,
          image: blob.url,
          tourId: tour.id,
        },
      });
    });
  }

  redirect("/");
}
