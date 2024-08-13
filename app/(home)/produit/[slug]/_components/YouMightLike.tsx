import { Product } from "@/components/Product";
import { ProductType } from "@/types/ProductSchema";

export type YouMightLikeProps = {
  products: ProductType[];
};

export const YouMightLike = (props: YouMightLikeProps) => {
  if (props.products.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold tracking-tight">
        Vous pourriez aimer
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {props.products.slice(0, 4).map((product, index) => {
          const price = product?.price - product?.discount;
          return <Product product={product} key={product.id} price={price} />;
        })}
      </div>
    </div>
  );
};
