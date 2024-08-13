import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session.customer_details?.address;

  // const addressComponents = [
  //   address?.line1,
  //   address?.line2,
  //   address?.city,
  //   address?.state,
  //   address?.postal_code,
  //   address?.country,
  // ];

  // const addressString = addressComponents.filter((c) => c !== null).join(", ");

  // const shippingOption = session.shipping_options || "Standard Shipping";

  // console.log("methode de livraison", shippingOption);

  console.log("TOUTE LA SESSION STRIPE", session);

  const paymentIntent = session.payment_intent as string;
  const paymentIntentObject = (await stripe.paymentIntents.retrieve(
    paymentIntent,
    {
      expand: ["latest_charge"],
    }
  )) as Stripe.PaymentIntent;
  const charge = paymentIntentObject.latest_charge as Stripe.Charge;
  const receipt_url = charge.receipt_url;

  console.log("EVENT TYPE", event.type);

  switch (event.type) {
    case "checkout.session.completed": {
      const order = await prisma.order.update({
        where: {
          id: session?.metadata?.orderId,
        },
        data: {
          isPaid: true,
          address_line1: address?.line1 ?? "",
          address_line2: address?.line2 ?? "",
          city: address?.city ?? "",
          state: address?.state ?? "",
          postalCode: address?.postal_code ?? "",
          country: address?.country ?? "",
          phone: session?.customer_details?.phone || "",
          name: session.customer_details?.name,
          receiptUrl: receipt_url,
        },
        include: {
          orderItems: true,
        },
      });

      // const productIds = order.orderItems.map(
      //   (orderItem) => orderItem.productId
      // );

      for (const orderItem of order.orderItems) {
        await prisma.product.update({
          where: { id: orderItem.productId },
          data: {
            stock: {
              decrement: orderItem.quantity,
            },
          },
        });
      }

      // await prisma.product.updateMany({
      //   where: {
      //     id: {
      //       in: [...productIds],
      //     },
      //   },
      //   data: {
      //     stock: 0,
      //   },
      // });
      break;
    }
  }

  return new NextResponse("ok", { status: 200 });
}
