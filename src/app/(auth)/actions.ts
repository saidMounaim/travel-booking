"use server";

import bcrypt from "bcryptjs";
import { signUpFormSchema } from "@/lib/validator";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface signUpActionProps {
  name: string;
  email: string;
  password: string;
  mobile: string;
}

export async function signUpAction({
  name,
  password,
  email,
  mobile,
}: signUpActionProps) {
  const passwordHashed = bcrypt.hashSync(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      mobile,
      password: passwordHashed,
      isAdmin: false,
    },
  });

  redirect("/sign-in");
}
