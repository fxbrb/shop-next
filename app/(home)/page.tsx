import { About } from "@/components/About";
import { Hero } from "@/components/Hero";
import { LastReviews } from "@/components/LastReviews";
import { LatestCategories } from "@/components/LatestCategories";
import { LatestProducts } from "@/components/LatestProducts";
import { ShippingInfos } from "@/components/ShippingInfos";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const products = await prisma.product.findMany({
    where: {
      stock: {
        gt: 0,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!products || !categories) {
    throw new Error("Product not found");
  }
  return (
    <div className="h-full">
      <Hero />

      {products.length > 0 && <LatestProducts products={products} />}
      <div className="h-20"></div>
      {categories.length > 0 && <LatestCategories categories={categories} />}
      <div className="h-20"></div>
      <About />
      <LastReviews />
      <ShippingInfos />
    </div>
  );
}
