import { Product } from "@/components/Product";
import { ProductType } from "@/types/ProductSchema";
import { PaginationControls } from "./Pagination";

export type ProductsListProps = {
  products: ProductType[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  searchParams: { [key: string]: string | string[] | undefined };
};

export const ProductsList = (props: ProductsListProps) => {
  if (props.products.length === 0) {
    return (
      <div className="mt-6 text-center">
        <p className="text-lg text-muted-foreground">Aucun produit</p>
      </div>
    );
  }

  console.log(props.products);

  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {props.products.map((product) => {
          const price = product?.price - product?.discount;
          return <Product product={product} key={product.id} price={price} />;
        })}
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
