import { Section } from "@/components/Section";
import { prisma } from "@/lib/prisma";
import { ProductDetails } from "./_components/ProductDetails";
import { Reviews } from "./_components/Reviews";
import { YouMightLike } from "./_components/YouMightLike";

export type ProductPageProps = {
  slug?: string;
};

export default async function ProductPage({
  params,
}: {
  params: ProductPageProps;
}) {
  const product = await prisma.product.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      category: true,
    },
  });

  if (!product) {
    throw new Error("Produit introuvable");
  }

  const reviews = await prisma.review.findMany({
    where: {
      productId: product.id,
    },
    include: {
      user: {
        select: {
          id: true,
          firstname: true,
          lastname: true,
        },
      },
    },
  });

  if (!reviews) {
    return null;
  }
  const products = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: {
        not: product.id,
      },
    },
    include: {
      category: true,
    },
  });

  return (
    <Section className="flex flex-col gap-16 py-8 md:py-10">
      <ProductDetails product={product} reviews={reviews} />
      <YouMightLike products={products} />
      <Reviews reviews={reviews} productId={product.id} />
    </Section>
  );
}
