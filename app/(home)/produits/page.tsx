import { Section } from "@/components/Section";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Filters } from "./_components/Filters";
import { ProductsList } from "./_components/ProductsList";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category =
    typeof searchParams.category === "string" ? searchParams.category : "all";
  const sort =
    typeof searchParams.sort === "string" ? searchParams.sort : "name-a-z";
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
  const itemsPerPage = 8;

  const where = {
    stock: {
      gt: 0,
    },
    ...(category !== "all" ? { categoryId: category } : {}),
  };

  let orderBy = {};
  switch (sort) {
    case "name-a-z":
      orderBy = { name: "asc" };
      break;
    case "name-z-a":
      orderBy = { name: "desc" };
      break;
    case "old":
      orderBy = { createdAt: "asc" };
      break;
    case "new":
      orderBy = { createdAt: "desc" };
      break;
    case "price_asc":
      orderBy = { price: "asc" };
      break;
    case "price_desc":
      orderBy = { price: "desc" };
      break;
  }

  const [products, totalItems] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy,
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
    }),
    prisma.product.count({ where }),
  ]);

  const productsWithFinalPrice = products.map((product) => ({
    ...product,
    finalPrice: product.price - product.discount,
  }));

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const categories = await prisma.category.findMany();

  if (!categories) {
    throw new Error("No categories found");
  }

  if (!products) {
    throw new Error("No products found");
  }

  return (
    <Section>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Accueil</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Produits</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between lg:items-center space-y-3 py-8 max-lg:flex-col">
        <h1 className="text-4xl font-bold leading-none tracking-tighter lg:text-5xl">
          Parcourir les produits
        </h1>

        <Filters
          categories={categories}
          selectedCategory={category}
          selectedSort={sort}
        />
      </div>

      <ProductsList
        products={productsWithFinalPrice}
        currentPage={page}
        totalPages={totalPages}
        searchParams={searchParams}
        itemsPerPage={itemsPerPage}
      />
    </Section>
  );
}
