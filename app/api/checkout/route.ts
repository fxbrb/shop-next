import { NextResponse } from "next/server";
import Stripe from "stripe";

import { auth } from "@/auth";
import { CartItem } from "@/hooks/use-cart";
import getBaseURL from "@/lib/base-url";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    console.log("Received checkout request");
    // const { productIds } = await req.json();
    const { cartItems } = await req.json();
    console.log("Cart items:", cartItems);
    const authSession = await auth();

    if (!authSession?.user.id) {
      return new NextResponse("You need to be logged", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: authSession?.user.id ?? "",
      },
      select: { stripeCustomerId: true },
    });

    const stripeCustomerId = user?.stripeCustomerId ?? undefined;

    if (!cartItems || cartItems.length === 0) {
      return new NextResponse("Cart items are required", { status: 400 });
    }

    // const products = await prisma.product.findMany({
    //   where: {
    //     id: {
    //       in: productIds,
    //     },
    //   },
    // });

    // const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    // products.forEach((product) => {
    //   line_items.push({
    //     quantity: 1,
    //     price_data: {
    //       currency: "EUR",
    //       product_data: {
    //         name: product.name,
    //       },

    //       unit_amount: product.price * 100,
    //     },
    //   });
    // });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cartItems.map((item: any) => ({
        quantity: item.quantity,
        price_data: {
          currency: "EUR",
          product_data: {
            name: item.name,
            images: [item.image], // Assuming you have an image URL
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects amount in cents
        },
      }));

    const order = await prisma.order.create({
      data: {
        isPaid: false,
        orderItems: {
          create: cartItems.map((item: CartItem) => ({
            product: {
              connect: {
                id: item.id,
              },
            },
            quantity: item.quantity,
          })),
        },
        userId: authSession.user.id,
      },
    });

    // const order = await prisma.order.create({
    //   data: {
    //     isPaid: false,
    //     orderItems: {
    //       create: productIds.map((productId: string) => ({
    //         product: {
    //           connect: {
    //             id: productId,
    //           },
    //         },
    //       })),
    //     },
    //   },
    // });

    const domain = getBaseURL();
    console.log("Creating Stripe session");
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      line_items,
      mode: "payment",
      payment_method_types: ["card", "paypal"],
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${domain}/panier?success=1`,
      cancel_url: `${domain}/panier?canceled=1`,
      metadata: {
        orderId: order.id,
      },
    });

    console.log("Stripe session created:", session);

    if (!session.url) {
      return NextResponse.json(
        { error: "Impossible de créer l'URL de la session Stripe" },
        { status: 500, headers: corsHeaders }
      );
    }

    console.log("Returning session URL:", session.url);

    return NextResponse.json(
      { url: session.url },
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("Error in checkout API:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors du traitement de la demande" },
      { status: 500, headers: corsHeaders }
    );
  }
}
