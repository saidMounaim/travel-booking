"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface addReviewProps {
  tourId: number;
  rating: number;
  comment: string;
  path: string;
}

export async function addReview({
  tourId,
  rating,
  comment,
  path,
}: addReviewProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  await prisma.review.create({
    data: {
      tourId,
      comment,
      rating,
      userId: session?.user.id,
    },
  });

  revalidatePath(path);
}

interface deleteReviewProps {
  userId: number;
  reviewId: number;
  path: string;
}

export async function deleteReview({
  userId,
  reviewId,
  path,
}: deleteReviewProps) {
  const session = await getServerSession(authOptions);

  if (!session || session?.user?.id !== userId) {
    redirect("/");
  }

  const review = await prisma.review.findFirst({ where: { id: reviewId } });

  if (!review) {
    throw new Error("Review not found");
  }

  await prisma.review.delete({ where: { id: review?.id } });

  revalidatePath(path);
}

interface bookTourProps {
  tourId: number;
  name: string;
  email: string;
  mobile: string;
  path: string;
}

export async function bookTour({
  tourId,
  path,
  name,
  email,
  mobile,
}: bookTourProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const tour = await prisma.tour.findFirst({ where: { id: tourId } });

  if (!tour) {
    throw new Error("Tour not found");
  }

  await prisma.reservation.create({
    data: {
      tourId,
      name,
      email,
      mobile,
      userId: session?.user.id,
    },
  });

  redirect(path);
}
