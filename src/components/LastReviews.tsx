import { prisma } from "@/lib/prisma";
import { Section } from "./Section";
import { InfiniteMovingCards } from "./ui/infinite-moving-card";

export const LastReviews = async () => {
  const reviews = await prisma.review.findMany({
    include: {
      user: true,
      product: true,
    },
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });

  if (reviews.length >= 4) {
    return (
      <Section className="space-y-6 overflow-hidden pb-16">
        <h3 className="text-center text-2xl font-semibold tracking-tight">
          Avis récents
        </h3>

        <InfiniteMovingCards reviews={reviews} direction="right" speed="slow" />
      </Section>
    );
  }
};
