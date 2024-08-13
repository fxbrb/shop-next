"use server";

import { prisma } from "@/lib/prisma";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";

export async function getCurrentMonthSales() {
  const now = new Date();
  const startOfCurrentMonth = startOfMonth(now);
  const endOfCurrentMonth = endOfMonth(now);

  const sales = await prisma.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: startOfCurrentMonth,
        lte: endOfCurrentMonth,
      },
    },
    _sum: {
      total: true,
    },
  });

  return sales._sum.total || 0;
}

export async function getPreviousMonthSales() {
  const now = new Date();
  const startOfPreviousMonth = startOfMonth(subMonths(now, 1));
  const endOfPreviousMonth = endOfMonth(subMonths(now, 1));

  const sales = await prisma.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: startOfPreviousMonth,
        lte: endOfPreviousMonth,
      },
    },
    _sum: {
      total: true,
    },
  });

  return sales._sum.total || 0;
}

export async function getSalesPercentageChange() {
  const currentMonthSales = await getCurrentMonthSales();
  const previousMonthSales = await getPreviousMonthSales();

  if (previousMonthSales === 0) {
    return currentMonthSales > 0 ? 100 : 0;
  }

  const percentageChange =
    ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100;
  return parseFloat(percentageChange.toFixed(2));
}
