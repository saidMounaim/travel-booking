"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteMyBooking(formData: FormData) {
  const userId = formData.get("userId");
  const bookingId = formData.get("bookingId");
  const path = formData.get("path");

  const session = await getServerSession(authOptions);

  if (
    !session ||
    (session.user.id !== Number(userId) && !session.user.isAdmin)
  ) {
    redirect("/");
  }

  const book = await prisma.reservation.findFirst({
    where: { id: Number(bookingId) },
  });

  if (!book) {
    throw new Error("Book not found");
  }

  await prisma.reservation.delete({ where: { id: book.id } });

  revalidatePath(path as string);
}
