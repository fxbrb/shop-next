"use server";

import { prisma } from "@/lib/prisma";
import { ActionError, authenticatedAction } from "@/lib/safe-actions";
import { slugify } from "@/lib/slugify";
import { ProductSchema } from "@/types/ProductSchema";
import { del } from "@vercel/blob";
import * as z from "zod";

const verifySlugUniqueness = async (name: string, productId?: string) => {
  const existingProduct = await prisma.product.findUnique({
    where: {
      slug: slugify(name),
    },
  });

  if (existingProduct && (!productId || existingProduct.id !== productId)) {
    throw new ActionError("Le slug est déjà utilisé par un autre produit.");
  }
};

export const createProductAction = authenticatedAction(
  ProductSchema,
  async (values, context) => {
    if (context.user.role !== "ADMIN") {
      throw new ActionError("Vous n'êtes pas autorisé à faire cette action.");
    }

    await verifySlugUniqueness(values.name);

    const product = await prisma.product.create({
      data: {
        ...values,
        slug: slugify(values.name),
        userId: context.user.id ?? "",
      },
    });

    return product;
  }
);

export const updateProductAction = authenticatedAction(
  z.object({
    id: z.string(),
    data: ProductSchema,
  }),
  async (values, context) => {
    if (context.user.role !== "ADMIN") {
      throw new ActionError("Vous n'êtes pas autorisé à faire cette action.");
    }

    const product = await prisma.product.findUnique({
      where: {
        id: values.id,
      },
    });

    if (!product) {
      throw new ActionError("Product not found");
    }

    await verifySlugUniqueness(values.data.name, values.id);

    const updatedProduct = await prisma.product.update({
      where: {
        id: values.id,
      },
      data: {
        ...values.data,
        slug: slugify(values.data.name),
      },
    });

    return updatedProduct;
  }
);

export const deleteProductAction = authenticatedAction(
  z.string(),
  async (productId, context) => {
    if (context.user.role !== "ADMIN") {
      throw new ActionError("Vous n'êtes pas autorisé à faire cette action.");
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new ActionError("Le produit n'a pas été trouvé.");
    }

    await Promise.all(
      product.images.map(async (image) => {
        await del(image);
      })
    );

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }
);
