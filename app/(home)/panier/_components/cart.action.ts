"use server";

import getBaseURL from "@/lib/base-url";
import { prisma } from "@/lib/prisma";
import { ActionError, authenticatedAction } from "@/lib/safe-actions";
import { stripe } from "@/lib/stripe";
import * as z from "zod";

const CheckoutSchema = z.object({
  cart: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      description: z.string().optional(),
      images: z.array(z.string()).optional(),
      discount: z.number().optional(),
      perfume: z.string().optional(),
    })
  ),
  totalPrice: z.number(),
});

const domain = getBaseURL();

export const checkoutAction = authenticatedAction(
  CheckoutSchema,
  async (values, context) => {
    if (!context.user.id) {
      throw new ActionError("Vous devez être connecter");
    }

    if (!values.cart || values.cart.length === 0) {
      throw new ActionError("Aucun article dans votre panier");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: context.user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    const stripeCustomerId = user?.stripeCustomerId ?? undefined;

    let order = await prisma.order.findFirst({
      where: {
        userId: context.user.id,
        isPaid: false,
      },
    });

    if (order) {
      order = await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          total: values.totalPrice,
          orderItems: {
            deleteMany: {},
            create: values.cart.map((item) => ({
              product: {
                connect: {
                  id: item.id,
                },
              },
              quantity: item.quantity,
              perfume: item.perfume ?? "",
            })),
          },
        },
      });
    } else {
      order = await prisma.order.create({
        data: {
          isPaid: false,
          total: values.totalPrice,
          orderItems: {
            create: values.cart.map((item) => ({
              product: {
                connect: {
                  id: item.id,
                },
              },
              quantity: item.quantity,
              perfume: item.perfume ?? "",
            })),
          },
          userId: context.user.id,
        },
      });
    }

    // const order = await prisma.order.create({
    //   data: {
    //     isPaid: false,
    //     total: values.totalPrice,
    //     orderItems: {
    //       create: values.cart.map((item) => ({
    //         product: {
    //           connect: {
    //             id: item.id,
    //           },
    //         },
    //         quantity: item.quantity,
    //         perfume: item.perfume ?? "",
    //       })),
    //     },
    //     userId: context.user.id,
    //   },
    // });
    const defaultAddress = await prisma.address.findFirst({
      where: {
        userId: context.user.id,
        isDefault: true,
      },
    });

    if (!defaultAddress) {
      throw new Error("Aucune adresse par défaut trouvée pour l'utilisateur");
    }

    if (stripeCustomerId) {
      await stripe.customers.update(stripeCustomerId, {
        address: {
          line1: defaultAddress.address_line1,
          line2: defaultAddress.address_line2 ?? "",
          city: defaultAddress.city,
          postal_code: defaultAddress.postalCode,
          country: defaultAddress.country,
          state: defaultAddress.country,
        },
        shipping: {
          name: `${context.user.firstname} ${context.user.lastname}`,
          address: {
            line1: defaultAddress.address_line1,
            line2: defaultAddress.address_line2 ?? "",
            city: defaultAddress.city,
            postal_code: defaultAddress.postalCode,
            country: defaultAddress.country,
            state: defaultAddress.country,
          },
          phone: defaultAddress.phone ?? "",
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "CH"],
      },

      mode: "payment",
      payment_method_types: ["card", "paypal"],
      locale: "fr",

      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 500,
              currency: "EUR",
            },
            display_name: "Standard Shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 3,
              },
              maximum: {
                unit: "business_day",
                value: 5,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "EUR",
            },
            display_name: "Express Shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 2,
              },
            },
          },
        },
      ],

      line_items: values.cart.map((item: any) => ({
        quantity: item.quantity,
        price_data: {
          currency: "EUR",
          product_data: {
            name: item.perfume ? `${item.name} - ${item.perfume}` : item.name,
            images:
              item.images && item.images.length > 0 ? [item.images[0]] : [],
          },
          unit_amount:
            item.discount > 0
              ? Math.round((item.price - item.discount) * 100)
              : Math.round(item.price * 100),
        },
      })),
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${domain}/panier/success`,
      cancel_url: `${domain}/panier/cancel`,
      metadata: {
        orderId: order.id,
      },
    });

    if (!session.url) {
      throw new Error("Session URL is missing");
    }

    console.log(session);

    return { redirectUrl: session.url };
  }
);
