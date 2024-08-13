"use server";

import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ActionError, action } from "@/lib/safe-actions";
import { LoginSchema } from "@/types/LoginSchema";
import { AuthError } from "next-auth";

export const loginAction = action(LoginSchema, async (values) => {
  const { email, password } = values;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    throw new ActionError("Aucun utilisateur inscrit avec ce mail");
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new ActionError("E-mail ou mot de passe incorrect !");
        case "AccessDenied":
          throw new ActionError(error.message);
        case "OAuthAccountNotLinked":
          throw new ActionError(
            "E-mail déjà utilisé avec un autre système de connexion"
          );
        case "OAuthSignInError":
          throw new ActionError(error.message);
        default:
          throw new ActionError("Un problème est survenu");
      }
    }

    throw error;
  }
});
