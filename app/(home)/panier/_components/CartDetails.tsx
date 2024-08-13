"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { CartItem, useCart } from "@/hooks/use-cart";
import formatPrice from "@/lib/format-price";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/ProductSchema";
import { useMutation } from "@tanstack/react-query";
import {
  CheckIcon,
  ChevronRight,
  MinusCircle,
  PlusCircle,
  ShoppingCart,
} from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import { checkoutAction } from "./cart.action";

type CartDetailsProps = {
  user?: Session["user"];
  products: ProductType[];
};

export const CartDetails = (props: CartDetailsProps) => {
  const {
    cart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();
  const router = useRouter();

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      const price = item.discount > 0 ? item.price - item.discount : item.price;
      return acc + price * item.quantity;
    }, 0);
  }, [cart]);

  useEffect(() => {
    cart.forEach((product) => {
      if (!props.products.find((p) => p.id === product.id)) {
        removeFromCart(product);
      }
    });
  }, [props.products]);

  const mutation = useMutation({
    mutationFn: async (values: { cart: CartItem[]; totalPrice: number }) => {
      const { serverError, data } = await checkoutAction(values);

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }

      router.push(data.redirectUrl);
    },
  });

  return (
    <div className="flex flex-col w-full">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Panier</h2>
        <p className="text-sm text-muted-foreground">{cart.length} articles</p>
      </div>

      {cart.length > 0 ? (
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <ul className="divide-y divide-gray-200 border-b border-t border-gray-200 lg:col-span-7">
            {cart.map((product) => (
              <li key={product.id} className="flex py-6 sm:py-10">
                <div className="flex-shrink-0">
                  <img
                    src={product.images[0]}
                    alt={`${product.name} image`}
                    className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32"
                  />
                </div>

                <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <div>
                    <div className="flex justify-between sm:grid sm:grid-cols-2">
                      <div className="pr-6">
                        <h3 className="text-sm">
                          <Link
                            href={`/produit/${product.slug}`}
                            className="font-medium"
                          >
                            {product.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {product.perfume}
                        </p>
                      </div>

                      {/* <p className="text-right text-sm font-medium">
                        {product.discount
                          ? formatPrice(product.price - product.discount)
                          : formatPrice(product.price)}
                      </p> */}
                      {product.discount > 0 ? (
                        <div className="flex items-center gap-2 text-sm justify-end">
                          <Badge variant="destructive">
                            <p className="line-through">
                              {formatPrice(product?.price)}
                            </p>
                          </Badge>

                          <p className="font-medium">
                            {formatPrice(product?.price - product?.discount)}
                          </p>
                        </div>
                      ) : (
                        <p className="font-medium text-sm text-right">
                          {formatPrice(product?.price)}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 flex items-center sm:absolute sm:left-1/2 sm:top-0 sm:mt-0 sm:block">
                      <div className="flex w-28 items-center">
                        <MinusCircle
                          className="cursor-pointer transition-colors size-4 duration-300 hover:text-muted-foreground"
                          onClick={() => {
                            decreaseQuantity(product);
                          }}
                        />

                        <p className="select-none px-4 py-2 text-sm font-bold">
                          {product.quantity}
                        </p>

                        <PlusCircle
                          className="cursor-pointer transition-colors size-4 duration-300 hover:text-muted-foreground"
                          onClick={() => {
                            increaseQuantity(product);
                          }}
                        />
                      </div>

                      <button
                        className="ml-4 text-sm font-medium sm:ml-0 sm:mt-3"
                        onClick={() => {
                          removeFromCart(product);
                        }}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>

                  <p className="mt-4 flex space-x-2 text-sm">
                    <CheckIcon
                      className="h-5 w-5 flex-shrink-0 text-green-500"
                      aria-hidden="true"
                    />

                    <span>En stock</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-16 rounded-lg bg-muted/60 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <div className="-my-4 divide-y divide-muted-foreground/15 text-sm">
              <div className="flex items-center justify-between py-4">
                <p className="">Coût Total</p>
                <p className="font-medium ">$99.00</p>
              </div>
              <div className="flex items-center justify-between py-4">
                <p className="">Livraison</p>
                <p className="font-medium ">calculé au moment du paiement</p>
              </div>
              <div className="flex items-center justify-between py-4">
                <p className="text-base font-medium ">Total</p>
                <p className="text-base font-medium ">
                  {formatPrice(totalPrice)}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <Button
                className="w-full"
                size={"lg"}
                onClick={() => {
                  mutation.mutate({ cart, totalPrice });
                }}
                disabled={cart.length === 0 || mutation.isPending}
              >
                {mutation.isPending ? "Chargement..." : "Paiement"}
              </Button>
            </div>

            <div className="mt-6 text-center text-sm">
              <p>
                ou{" "}
                <Link
                  href="/produits"
                  className="font-medium hover:underline underline-offset-2"
                >
                  Continuer les achats
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center mt-16">
          <div className="size-16 rounded-full bg-black dark:bg-white flex items-center justify-center">
            <ShoppingCart className="size-4 text-white dark:text-black" />
          </div>
          <p className="mb-6 mt-4 text-base text-muted-foreground">
            Votre panier est vide
          </p>

          <Link
            className={cn(
              buttonVariants({
                size: "sm",
              }),
              "relative group shadow px-4 py-2 transition-all duration-300 gap-2 font-semibold tracking-tighter hover:ring-2 hover:ring-primary hover:ring-offset-2"
            )}
            href="/produits"
          >
            <span>Découvrir les produits</span>

            <ChevronRight className="size-4 translate-x-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </div>
  );
};
