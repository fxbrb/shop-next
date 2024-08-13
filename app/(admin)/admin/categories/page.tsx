import { ContentLayout } from "@/components/admin-panel/ContentLayout";
import { EmptyState } from "@/components/admin-panel/EmptyState";
import { prisma } from "@/lib/prisma";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { CategoriesTable, CategoryColumn } from "./table";

export default async function CategoryListPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    image: category.image,
  }));
  return (
    <ContentLayout title="Liste des categories">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Categories</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="rounded-lg border-none mt-6">
        <CardContent className="p-6">
          {formattedCategories.length > 0 ? (
            <CategoriesTable data={formattedCategories} />
          ) : (
            <EmptyState
              title="Aucune catégorie!"
              description="Il semble que votre boutique ne contient aucune catégorie pour le moment.
"
            />
          )}
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
