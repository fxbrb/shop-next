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
import { CategoriesList } from "./_components/CategoriesList";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
  const itemsPerPage = 6;

  const categories = await prisma.category.findMany({
    skip: (page - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  const countQuery = await prisma.category.count();

  const totalPages = Math.ceil(countQuery / itemsPerPage);

  if (!categories) {
    throw new Error("No categories found");
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
            <BreadcrumbPage>Categories</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between lg:items-center space-y-3 py-8 max-lg:flex-col">
        <h1 className="text-4xl font-bold leading-none tracking-tighter lg:text-5xl">
          Parcourir les catégories
        </h1>
      </div>
      <CategoriesList
        categories={categories}
        currentPage={page}
        totalPages={totalPages}
        searchParams={searchParams}
        itemsPerPage={itemsPerPage}
      />
    </Section>
  );
}
