"use server";

import { toSlug } from "@/lib/utils";
import { nanoid } from "nanoid";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CreateTourFormProps } from "@/types/types";

export async function createTour({ tour }: CreateTourFormProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const {
    title,
    body,
    checkIn,
    checkOut,
    pricePerNight,
    guests,
    galleryTour,
    feauturedImage,
  } = tour;

  const slug = `${toSlug(title as string)}-${nanoid(10)}`;

  const tourCreate = await prisma.tour.create({
    data: {
      title,
      slug,
      body,
      checkIn,
      checkOut,
      feauturedImage: feauturedImage as string,
      pricePerNight: parseInt(pricePerNight),
      guests: parseInt(guests),
      userId: session?.user.id,
    },
  });

  if (galleryTour && tour) {
    galleryTour.forEach(async (gallery: any) => {
      await prisma.gallery.create({
        data: {
          title: gallery.titleGallery,
          image: gallery.imageGallery,
          tourId: tourCreate.id,
        },
      });
    });
  }

  redirect("/");
}
