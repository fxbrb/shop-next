"use server";

import ForgotPassword from "@/emails/ForgotPassword";
import getBaseURL from "@/lib/base-url";
import { prisma } from "@/lib/prisma";
import { ActionError, action } from "@/lib/safe-actions";
import { ForgotPasswordSchema } from "@/types/PasswordSchema";
import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = getBaseURL();

const generateToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 15 * 60 * 1000);

  const existingToken = await prisma.passwordResetToken.findFirst({
    where: { email },
  });

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const forgotPasswordAction = action(
  ForgotPasswordSchema,
  async (values) => {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: values.email,
      },
    });

    if (!existingUser) {
      throw new ActionError("Aucun utilisateur inscrit avec ce mail!");
    }

    if (!existingUser.password) {
      throw new ActionError(
        "Il vous est impossible de changer de mot de passe lorsque vous êtes incrit avec google!"
      );
    }

    const passwordResetToken = await generateToken(values.email);

    const resetLink = `${domain}/nouveau-mot-de-passe?token=${passwordResetToken.token}`;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: values.email,
      subject:
        "🔐 Hop, un nouveau mot de passe - En quelques secondes c'est fait !",
      react: ForgotPassword({
        resetPasswordLink: resetLink,
        firstname: existingUser.firstname!,
        email: passwordResetToken.email,
      }),
    });

    return { success: "Email de réinitialisation envoyé!" };
  }
);
