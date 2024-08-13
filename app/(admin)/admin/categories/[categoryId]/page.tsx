import { ContentLayout } from "@/components/admin-panel/ContentLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { CategoryForm } from "../CategoryForm";

export default async function UpdateCategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const categories = await prisma.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  if (!categories) {
    throw new Error("No category found");
  }

  return (
    <ContentLayout title="Editer une categorie">
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
            <BreadcrumbPage>Editer une Categorie</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="rounded-lg border-none mt-6">
        <CardContent className="p-6">
          <CategoryForm defaultValues={categories} />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
