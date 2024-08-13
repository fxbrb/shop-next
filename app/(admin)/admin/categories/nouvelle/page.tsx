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

export default async function NewCategoriePage() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return (
    <ContentLayout title="Créer une catégorie">
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
            <BreadcrumbPage>Ajouter une catégorie</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="rounded-lg border-none mt-6">
        <CardContent className="p-6">
          <CategoryForm />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
