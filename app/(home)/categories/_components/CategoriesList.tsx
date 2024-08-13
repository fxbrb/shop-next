import { CategoryType } from "@/types/CategorySchema";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { PaginationControls } from "../../produits/_components/Pagination";

export type CategoriesListProps = {
  categories: CategoryType[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  searchParams: { [key: string]: string | string[] | undefined };
};

export const CategoriesList = (props: CategoriesListProps) => {
  console.log(props.itemsPerPage);
  console.log(props.categories.length);

  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {props.categories.map((category) => (
          <Link
            href={`/produits?category=${category.id}`}
            key={category.id}
            className="group relative"
          >
            <div className="relative h-80 w-full overflow-hidden rounded-lg group-hover:opacity-75 sm:h-64">
              <img
                src={category.image}
                alt={`${category.name} image`}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="flex justify-between gap-2 mt-5">
              <h3 className="text-sm">{category.name}</h3>

              <SquareArrowOutUpRight className="size-4" />
            </div>
          </Link>
        ))}
      </div>
      {props.totalPages > 1 && (
        <div className="mt-8">
          <PaginationControls
            currentPage={props.currentPage}
            totalPages={props.totalPages}
            searchParams={props.searchParams}
          />
        </div>
      )}
    </>
  );
};
