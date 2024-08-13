"use client";

import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export const CartButton = () => {
  const { cart } = useCart();

  return (
    <Link
      href="/panier"
      className={cn(
        buttonVariants({
          size: "icon",
          variant: "ghost",
        }),
        "relative"
      )}
    >
      <ShoppingCart className="size-4" />

      {cart.length > 0 && (
        <span className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full border border-black dark:border-white dark:bg-white bg-black text-secondary text-[0.7rem] font-bold">
          {cart.length}
        </span>
      )}
    </Link>
  );
};
