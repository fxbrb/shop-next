"use client";

import { RemoveButton } from "@/components/admin-panel/RemoveButton";
import { buttonVariants } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCategoryAction } from "./category.action";

interface CategoriesTableProps {
  data: CategoryColumn[];
}

export const CategoriesTable: React.FC<CategoriesTableProps> = ({ data }) => {
  const router = useRouter();

  return (
    <DataTable
      searchKey="name"
      columns={columns}
      data={data}
      placeholder="Recherche par nom..."
    />
  );
};

export type CategoryColumn = {
  id: string;
  name: string;
  image: string;
  slug: string;
  description: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "image",
    header: "Image",

    cell: ({ row }) => {
      return (
        <div className="relative size-[50px] bg-neutral-100">
          <Image
            fill
            src={row.original.image}
            alt="test"
            className="rounded-md object-cover object-center"
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Link
          href={`/produits?category=${row.original.id}`}
          className={buttonVariants({
            size: "icon",
            variant: "ghost",
          })}
        >
          <Eye className="size-4" />
        </Link>
        <Link
          href={`/admin/categories/${row.original.id}`}
          className={buttonVariants({
            size: "icon",
            variant: "ghost",
          })}
        >
          <EditIcon className="size-4" />
        </Link>

        <RemoveButton
          itemId={row.original.id}
          itemType="category"
          onDeleteAction={deleteCategoryAction}
        />
      </div>
    ),
  },
];
