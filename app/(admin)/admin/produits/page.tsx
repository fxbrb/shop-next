import { ContentLayout } from "@/components/admin-panel/ContentLayout";
import { EmptyState } from "@/components/admin-panel/EmptyState";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import formatPrice from "@/lib/format-price";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ProductColumn, ProductsTable } from "./table";

export default async function ProductListPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
  });

  if (!products) {
    throw new Error("No products found");
  }

  const formattedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: formatPrice(product.price),
    stock: product.stock,
    image: product.images[0],
    category: product.category,
  }));

  console.log(formattedProducts);
  return (
    <ContentLayout title="Liste des produits">
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
            <BreadcrumbPage>Produits</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="rounded-lg border-none mt-6">
        <CardContent className="p-6">
          {formattedProducts.length > 0 ? (
            <ProductsTable data={formattedProducts} />
          ) : (
            <EmptyState
              title="Aucun produit!"
              description="Il semble que votre boutique ne contient aucun produit pour le moment.
            Ajoutez de nouveaux produits pour que vos clients puissent les découvrir et les acheter."
              redirectUrl="/admin/produits/nouveau"
              textBtn="Ajouter un produit"
            />
          )}
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
