import * as z from "zod";
import { ProductSchema } from "./ProductSchema";

const OrderItemSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  quantity: z.number(),
  perfume: z.string(),
  productId: z.string(),
  product: ProductSchema,
});

const OrderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  isPaid: z.boolean().default(false),
  name: z.string().nullable(),
  total: z.number(),
  phone: z.string().default(""),
  address_line1: z.string().default(""),
  address_line2: z.string().default(""),
  city: z.string().default(""),
  postalCode: z.string().default(""),
  country: z.string().default(""),
  receiptUrl: z.string().nullable(),
  orderItems: z.array(OrderItemSchema),
});

export type OrderType = z.infer<typeof OrderSchema>;
