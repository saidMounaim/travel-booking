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
