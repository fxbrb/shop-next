import { ProductType } from "@/types/ProductSchema";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { Product } from "./Product";
import { Section } from "./Section";

export type LatestProductsProps = {
  products: ProductType[];
};

export const LatestProducts = (props: LatestProductsProps) => {
  return (
    <Section id="latest-products" className="space-y-6 pt-24">
      <div className="flex items-center justify-between pr-3">
        <h3 className="text-2xl font-semibold tracking-tight">
          Nos derniers produits
        </h3>

        {props.products.length >= 4 && (
          <Link
            href="/produits"
            className="group flex items-center gap-2 text-sm transition duration-200 ease-in-out hover:text-foreground/80"
          >
            Tout voir
            <span
              aria-hidden="true"
              className="inline-block translate-x-0 transition-transform duration-200 ease-in-out group-hover:translate-x-1"
            >
              <MoveRight className="size-4" />
            </span>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {props.products.slice(0, 4).map((product) => {
          const price = product?.price - product?.discount;
          return <Product key={product.id} product={product} price={price} />;
        })}
      </div>
    </Section>
  );
};
