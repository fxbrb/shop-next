"use server";

import { prisma } from "@/lib/prisma";
import { ActionError, action } from "@/lib/safe-actions";
import { RegisterSchema } from "@/types/RegisterSchema";
import bcrypt from "bcryptjs";

export const registerAction = action(RegisterSchema, async (values) => {
  const { email, password, firstname, lastname } = values;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new ActionError("Cette adresse e-mail est déjà utilisée");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      firstname,
      lastname,
      email,
      password: hashedPassword,
    },
  });

  return user;
});
