"use client";

import { Product } from "@/components/Product";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { useFavorite } from "@/hooks/use-favorite";
import { Bell } from "lucide-react";
import Link from "next/link";

export const FavoriteList = () => {
  const { favorite, removeFromFavorite } = useFavorite();

  if (favorite.length === 0) {
    return (
      <Alert>
        <Bell className="size-4" />

        <div className="flex items-center justify-between gap-10">
          <div className="flex flex-col gap-1.5">
            <AlertTitle>Aucun favoris!</AlertTitle>
            <AlertDescription>
              Parcourez nos produits et ajoutez vos articles préférés à votre
              wishlist pour les retrouver facilement plus tard.
            </AlertDescription>
          </div>

          <Link href="/produits" className={buttonVariants()}>
            Parcourir les produits
          </Link>
        </div>
      </Alert>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {favorite.map((product) => {
        const price = product?.price - product?.discount;
        return <Product product={product} key={product.id} price={price} />;
      })}
    </div>
  );
};
