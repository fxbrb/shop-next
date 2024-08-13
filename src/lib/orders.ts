"use server";

import { prisma } from "@/lib/prisma";

export async function getRecentOrders() {
  const recentOrders = await prisma.order.findMany({
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      user: true,
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  return recentOrders;
}
