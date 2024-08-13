"use server";

import { prisma } from "@/lib/prisma";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";

export async function getCurrentMonthSoldItems() {
  const now = new Date();
  const startOfCurrentMonth = startOfMonth(now);
  const endOfCurrentMonth = endOfMonth(now);

  const soldItems = await prisma.orderItem.aggregate({
    where: {
      order: {
        isPaid: true,
        createdAt: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
      },
    },
    _sum: {
      quantity: true,
    },
  });

  return soldItems._sum.quantity || 0;
}

export async function getPreviousMonthSoldItems() {
  const now = new Date();
  const startOfPreviousMonth = startOfMonth(subMonths(now, 1));
  const endOfPreviousMonth = endOfMonth(subMonths(now, 1));

  const soldItems = await prisma.orderItem.aggregate({
    where: {
      order: {
        isPaid: true,
        createdAt: {
          gte: startOfPreviousMonth,
          lte: endOfPreviousMonth,
        },
      },
    },
    _sum: {
      quantity: true,
    },
  });

  return soldItems._sum.quantity || 0;
}

export async function getSoldItemsPercentageChange() {
  const currentMonthSoldItems = await getCurrentMonthSoldItems();
  const previousMonthSoldItems = await getPreviousMonthSoldItems();

  if (previousMonthSoldItems === 0) {
    return currentMonthSoldItems > 0 ? 100 : 0;
  }

  const percentageChange =
    ((currentMonthSoldItems - previousMonthSoldItems) /
      previousMonthSoldItems) *
    100;
  return parseFloat(percentageChange.toFixed(2));
}
