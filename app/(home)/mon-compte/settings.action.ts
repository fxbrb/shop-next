"use server";

import { prisma } from "@/lib/prisma";
import { ActionError, authenticatedAction } from "@/lib/safe-actions";
import { AddressSchema } from "@/types/AddressSchema";
import { PasswordSchema } from "@/types/PasswordSchema";
import { SettingsSchema } from "@/types/SettingsSchema";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const settingsAction = authenticatedAction(
  SettingsSchema,
  async (values, context) => {
    const { firstname, lastname, email, birthday, phone } = values;

    const user = await prisma.user.findUnique({
      where: {
        id: context.user.id,
      },
    });

    if (!user) {
      throw new ActionError("Utilisateur introuvable!");
    }

    if (context.user.isOAuth) {
      if (email !== user.email) {
        throw new ActionError(
          "Vous ne pouvez pas modifier votre e-mail lorsque vous êtes connecté avec Google."
        );
      }
    }

    const results = await prisma.user.update({
      where: {
        id: context.user.id,
      },
      data: {
        firstname,
        lastname,
        email,
        birthday,
        phone,
      },
    });

    revalidatePath("/mon-compte");

    return results;
  }
);

export const changePasswordAction = authenticatedAction(
  PasswordSchema,
  async (values, context) => {
    const { password, newPassword, confirmPassword } = values;

    const user = await prisma.user.findUnique({
      where: {
        id: context.user.id,
      },
    });

    if (!user) {
      throw new ActionError("Utilisateur introuvable!");
    }

    if (context.user.isOAuth) {
      if (newPassword) {
        throw new ActionError(
          "Vous ne pouvez pas modifier votre mot de passe lorsque vous êtes connecté avec Google."
        );
      }
    }

    if (newPassword !== confirmPassword) {
      throw new ActionError("Les mots de passe ne correspondent pas");
    }

    if (password && newPassword && user.password) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new ActionError("Mot de passe actuel incorrect");
      }

      const samePassword = await bcrypt.compare(newPassword, user.password);

      if (samePassword) {
        throw new ActionError(
          "Le nouveau mot de passe ne doit pas être le même que l'ancien"
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const results = await prisma.user.update({
        where: {
          id: context.user.id,
        },
        data: {
          password: hashedPassword,
        },
      });

      revalidatePath("/mon-compte");

      return results;
    }
  }
);

export const addAddressAction = authenticatedAction(
  AddressSchema,
  async (values, context) => {
    const {
      firstname,
      lastname,
      address_line1,
      address_line2,
      postalCode,
      city,
      country,
      phone,
      isDefault,
    } = values;

    const user = await prisma.user.findUnique({
      where: {
        id: context.user.id,
      },
    });

    if (!user) {
      throw new ActionError("Utilisateur introuvable!");
    }

    const addressCount = await prisma.address.count({
      where: {
        userId: context.user.id,
      },
    });

    if (addressCount >= 3) {
      throw new ActionError("Vous ne pouvez pas avoir plus de 3 adresses.");
    }

    if (isDefault) {
      await prisma.address.updateMany({
        where: {
          userId: user.id,
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      });
    }

    const results = prisma.address.create({
      data: {
        firstname,
        lastname,
        isDefault,
        address_line1,
        address_line2,
        postalCode,
        city,
        country,
        phone,
        userId: user.id,
      },
    });

    revalidatePath("/mon-compte");

    return results;
  }
);

export const updateAddressAction = authenticatedAction(
  z.object({
    id: z.string(),
    data: AddressSchema,
  }),
  async (values, context) => {
    const {
      firstname,
      lastname,
      address_line1,
      address_line2,
      postalCode,
      city,
      country,
      phone,
      isDefault,
    } = values.data;

    const user = await prisma.user.findUnique({
      where: {
        id: context.user.id,
      },
    });

    if (!user) {
      throw new ActionError("Utilisateur introuvable!");
    }

    const address = await prisma.address.findUnique({
      where: {
        id: values.id,
        userId: user.id,
      },
    });

    if (!address) {
      throw new ActionError("Adresse introuvable!");
    }

    if (isDefault) {
      await prisma.address.updateMany({
        where: {
          userId: user.id,
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      });
    }

    const results = await prisma.address.update({
      where: {
        id: values.id,
      },
      data: {
        firstname,
        lastname,
        isDefault,
        address_line1,
        address_line2,
        postalCode,
        city,
        country,
        phone,
      },
    });

    revalidatePath("/mon-compte");

    return results;
  }
);

export const deleteAddressAction = authenticatedAction(
  z.string(),
  async (addressId, context) => {
    const user = await prisma.user.findUnique({
      where: {
        id: context.user.id,
      },
    });

    if (!user) {
      throw new ActionError("Utilisateur introuvable!");
    }

    const address = await prisma.address.findUnique({
      where: {
        id: addressId,
        userId: user.id,
      },
    });

    if (!address) {
      throw new ActionError("Adresse introuvable!");
    }

    if (address.isDefault) {
      const addressCount = await prisma.address.count({
        where: { userId: user.id },
      });

      if (address.isDefault || addressCount === 1) {
        throw new ActionError(
          "L'adresse par défaut ne peut pas être supprimée avant de définir une autre adresse par défaut."
        );
      }
    }

    await prisma.address.delete({
      where: {
        id: addressId,
      },
    });

    revalidatePath("/mon-compte");
  }
);
