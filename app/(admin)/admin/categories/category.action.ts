"use server";

import { prisma } from "@/lib/prisma";
import { ActionError, authenticatedAction } from "@/lib/safe-actions";
import { slugify } from "@/lib/slugify";
import { CategorySchema } from "@/types/CategorySchema";
import { del } from "@vercel/blob";
import * as z from "zod";

const verifySlugUniqueness = async (name: string, categoryId?: string) => {
  const existingCategory = await prisma.category.findUnique({
    where: {
      slug: slugify(name),
    },
  });

  if (existingCategory && (!categoryId || existingCategory.id !== categoryId)) {
    throw new ActionError("Le slug est déjà utilisé par une autre categorie.");
  }
};

export const createCategoryAction = authenticatedAction(
  CategorySchema,
  async (values, context) => {
    await verifySlugUniqueness(values.name);

    if (context.user.role !== "ADMIN") {
      throw new ActionError("Vous n'êtes pas autorisé à faire cette action.");
    }

    const category = await prisma.category.create({
      data: {
        ...values,
        slug: slugify(values.name),
      },
    });

    return category;
  }
);

export const updateCategoryAction = authenticatedAction(
  z.object({
    id: z.string(),
    data: CategorySchema,
  }),
  async (values, context) => {
    if (context.user.role !== "ADMIN") {
      throw new ActionError("Vous n'êtes pas autorisé à faire cette action.");
    }

    const category = await prisma.category.findUnique({
      where: {
        id: values.id,
      },
    });

    if (!category) {
      throw new ActionError("Category not found");
    }

    await verifySlugUniqueness(values.data.name, values.id);

    const updatedCategory = await prisma.category.update({
      where: {
        id: values.id,
      },
      data: {
        ...values.data,
        slug: slugify(values.data.name),
      },
    });

    return updatedCategory;
  }
);

export const deleteCategoryAction = authenticatedAction(
  z.string(),
  async (categoryId, context) => {
    if (context.user.role !== "ADMIN") {
      throw new ActionError("Vous n'êtes pas autorisé à faire cette action.");
    }

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        products: true,
      },
    });

    if (!category) {
      throw new ActionError("La catégorie n'a pas été trouvé.");
    }

    if (category.products.length > 0) {
      throw new ActionError(
        "Impossible de supprimer cette catégorie car elle contient des produits."
      );
    }

    await del(category.image);

    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
  }
);
