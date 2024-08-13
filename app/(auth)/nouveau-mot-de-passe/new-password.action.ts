"use server";

import { prisma } from "@/lib/prisma";
import { ActionError, action } from "@/lib/safe-actions";
import { NewPasswordSchema } from "@/types/PasswordSchema";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const newPasswordAction = action(
  z.object({
    token: z.string().nullable().optional(),
    data: NewPasswordSchema,
  }),
  async (values) => {
    if (!values.token) {
      throw new ActionError("Token introuvable!");
    }

    const existingToken = await prisma.passwordResetToken.findUnique({
      where: { token: values.token },
    });

    if (!existingToken) {
      throw new ActionError("Token invalide!");
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      throw new ActionError("Token expirée!");
    }

    if (values.data.confirmPassword !== values.data.password) {
      throw new ActionError("Les mots de passe ne correspondent pas");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: existingToken.email,
      },
    });

    if (!existingUser) {
      throw new ActionError("Utilisateur introuvable!");
    }

    const hashedPassword = await bcrypt.hash(values.data.password, 10);

    await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    await prisma.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
);
