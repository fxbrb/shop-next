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
import { ProductForm } from "../ProductForm";

export default async function UpdateProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const products = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      category: true,
    },
  });

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  if (!products) {
    throw new Error("No category found");
  }

  return (
    <ContentLayout title="Editer un produit">
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
            <BreadcrumbPage>Editer un Produit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="rounded-lg border-none mt-6">
        <CardContent className="p-6">
          <ProductForm defaultValues={products} categories={categories} />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
