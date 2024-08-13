"use client";

import { useCart } from "@/hooks/use-cart";
import formatPrice from "@/lib/format-price";
import { OrderType } from "@/types/OrderSchema";
import Image from "next/image";
import { useEffect } from "react";

export type SuccessClientProps = {
  order: OrderType;
};

export const SuccessClient = (props: SuccessClientProps) => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Merci pour votre commande!
        </h1>
        <p className="text-base text-muted-foreground">
          Votre commande <span className="uppercase">#{props.order.id}</span> a
          bien été prise en compte.
        </p>
      </div>

      <div className="space-y-5">
        <h2 className="text-3xl font-semibold tracking-tight">
          Récapitulatif de votre commande
        </h2>
        <div className="mt-10 border-t border-border">
          {props.order.orderItems.map((item) => (
            <div
              key={item.id}
              className="flex space-x-6 border-b border-border py-10"
            >
              <Image
                src={item.product.images[0]}
                alt={item.product.name}
                width={70}
                height={70}
                className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center"
              />
              <div className="flex flex-auto flex-col">
                <div>
                  <h4 className="font-medium">
                    <a href={`/produit/${item.product.slug}`}>
                      {item.product.name}
                    </a>
                  </h4>
                  {item.perfume && (
                    <p className="text-sm text-muted-foreground">
                      {item.perfume}
                    </p>
                  )}
                </div>
                <div className="mt-6 flex flex-1 items-end">
                  <dl className="flex space-x-4 divide-x divide-border text-sm sm:space-x-6">
                    <div className="flex">
                      <dt className="font-medium">Quantité</dt>
                      <dd className="ml-2 text-muted-foreground">
                        {item.quantity}
                      </dd>
                    </div>
                    <div className="flex pl-4 sm:pl-6">
                      <dt className="font-medium">Prix</dt>
                      <dd className="ml-2 text-muted-foreground">
                        {formatPrice(item.product.price)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))}

          <div className="sm:ml-40 sm:pl-6">
            <h3 className="sr-only">Your information</h3>

            <h4 className="sr-only">Adresses</h4>
            <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
              <div>
                <dt className="font-medium text-gray-900">
                  Adresse de livraison
                </dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <span className="block">{props.order.address_line1}</span>
                    {/* <span className="block">7363 Cynthia Pass</span>
                  <span className="block">Toronto, ON N3Y 4H8</span> */}
                  </address>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Billing address</dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <span className="block">Kristin Watson</span>
                    <span className="block">7363 Cynthia Pass</span>
                    <span className="block">Toronto, ON N3Y 4H8</span>
                  </address>
                </dd>
              </div>
            </dl>

            <h4 className="sr-only">Payment</h4>
            <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">
              <div>
                <dt className="font-medium text-gray-900">Payment method</dt>
                <dd className="mt-2 text-gray-700">
                  <p>Apple Pay</p>
                  <p>Mastercard</p>
                  <p>
                    <span aria-hidden="true">••••</span>
                    <span className="sr-only">Ending in </span>1545
                  </p>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Shipping method</dt>
                <dd className="mt-2 text-gray-700">
                  <p>DHL</p>
                  <p>Takes up to 3 working days</p>
                </dd>
              </div>
            </dl>

            <h3 className="sr-only">Summary</h3>

            <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Subtotal</dt>
                <dd className="text-gray-700">$36.00</dd>
              </div>

              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Shipping</dt>
                <dd className="text-gray-700">$5.00</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Total</dt>
                <dd className="text-gray-900">$23.00</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};
