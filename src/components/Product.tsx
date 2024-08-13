"use client";

import { useFavorite } from "@/hooks/use-favorite";
import formatPrice from "@/lib/format-price";
import { ProductType } from "@/types/ProductSchema";
import { Heart, HeartOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export type ProductProps = {
  product: ProductType;
  price: number;
};

export const Product = (props: ProductProps) => {
  const { addToFavorite, favorite, removeFromFavorite } = useFavorite();
  const isInFavorite = favorite.some((i) => i.id === props.product.id);
  return (
    <Link href={`/produit/${props.product.slug}`} className="group">
      <div className="relative overflow-hidden rounded-lg aspect-square lg:h-[350px] w-full">
        <Image
          src={props.product.images[0]}
          alt={props.product.name}
          className="size-full rounded-lg bg-gray-50 object-cover transition-all duration-300 group-hover:scale-105 ease-in-out"
          fill
        />

        <Button
          className="absolute bottom-2 right-2 z-20"
          size={"icon"}
          variant={"outline"}
          onClick={(e) => {
            e.preventDefault();
            if (isInFavorite) {
              removeFromFavorite(props.product);
            } else {
              addToFavorite(props.product);
            }
          }}
        >
          {isInFavorite ? (
            <HeartOff className="size-4" />
          ) : (
            <Heart className="size-4" />
          )}
        </Button>
      </div>

      <div className="flex items-center justify-between gap-3 mt-4 ">
        <h3 className="text-sm">{props.product.name}</h3>

        {props.product.stock === 0 && <Badge>Épuisé</Badge>}
      </div>

      <div className="mt-1">
        {props.product.discount > 0 ? (
          <div className="flex items-center gap-2">
            <Badge variant="destructive">
              <p className="line-through">
                {formatPrice(props.product?.price)}
              </p>
            </Badge>

            <p className="text-lg font-medium">{formatPrice(props.price)}</p>
          </div>
        ) : (
          <p className="text-lg font-medium">
            {formatPrice(props.product?.price)}
          </p>
        )}
      </div>
    </Link>
  );
};
