"use server";

import { prisma } from "@/lib/prisma";
import { ActionError, authenticatedAction } from "@/lib/safe-actions";
import { ReviewSchema } from "@/types/ReviewsSchema";
import * as z from "zod";

export const addReviewAction = authenticatedAction(
  z.object({
    id: z.string(),
    data: ReviewSchema,
  }),
  async (values, context) => {
    const existingReview = await prisma.review.findFirst({
      where: {
        productId: values.id,
        userId: context.user.id,
      },
    });

    if (existingReview) {
      throw new ActionError("Vous avez déja évalué ce produit");
    }

    const { rating, message } = values.data;

    await prisma.review.create({
      data: {
        rating,
        message,
        productId: values.id,
        userId: context.user.id ?? "",
      },
    });
  }
);

export const deleteReviewAction = authenticatedAction(
  z.string(),
  async (reviewId, context) => {
    const review = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
      include: {
        user: true,
      },
    });

    if (!review) {
      throw new ActionError("L'avis n'a pas été trouvé.");
    }

    if (review.user.id !== context.user.id) {
      throw new ActionError("Action impossible");
    }

    await prisma.review.delete({
      where: {
        id: reviewId,
      },
    });
  }
);
