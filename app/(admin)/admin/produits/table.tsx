"use client";

import { RemoveButton } from "@/components/admin-panel/RemoveButton";
import { buttonVariants } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { CategoryType } from "@/types/CategorySchema";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteProductAction } from "./product.action";

interface ProductsTableProps {
  data: ProductColumn[];
}

export const ProductsTable: React.FC<ProductsTableProps> = ({ data }) => {
  const router = useRouter();

  return (
    <DataTable
      searchKey="name"
      placeholder="Recherche par nom..."
      columns={columns}
      data={data}
    />
  );
};

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  stock: number;
  image: string;
  slug: string;
  category: CategoryType;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "image",
    header: "Image",

    cell: ({ row }) => {
      return (
        <div className="aspect-square size-16 relative">
          <Image
            src={row.original.image}
            alt="product image"
            fill
            loading="lazy"
            className="rounded-md object-cover bg-gray-50"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "category",
    header: "Categorie",
    cell: ({ row }) => {
      return <p>{row.original.category.name}</p>;
    },
  },
  {
    accessorKey: "price",
    header: "Prix",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Link
          href={`/produit/${row.original.slug}`}
          className={buttonVariants({
            size: "icon",
            variant: "ghost",
          })}
        >
          <Eye className="size-4" />
        </Link>
        <Link
          href={`/admin/produits/${row.original.id}`}
          className={buttonVariants({
            size: "icon",
            variant: "ghost",
          })}
        >
          <EditIcon className="size-4" />
        </Link>

        <RemoveButton
          itemId={row.original.id}
          itemType="product"
          onDeleteAction={deleteProductAction}
        />
      </div>
    ),
  },
];
