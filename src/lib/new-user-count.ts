"use server";

import { prisma } from "@/lib/prisma";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";

export async function getCurrentMonthUsers() {
  const now = new Date();
  const startOfCurrentMonth = startOfMonth(now);
  const endOfCurrentMonth = endOfMonth(now);

  const users = await prisma.user.count({
    where: {
      createdAt: {
        gte: startOfCurrentMonth,
        lte: endOfCurrentMonth,
      },
    },
  });

  return users;
}

export async function getPreviousMonthUsers() {
  const now = new Date();
  const startOfPreviousMonth = startOfMonth(subMonths(now, 1));
  const endOfPreviousMonth = endOfMonth(subMonths(now, 1));

  const users = await prisma.user.count({
    where: {
      createdAt: {
        gte: startOfPreviousMonth,
        lte: endOfPreviousMonth,
      },
    },
  });

  return users;
}

export async function getUsersPercentageChange() {
  const currentMonthUsers = await getCurrentMonthUsers();
  const previousMonthUsers = await getPreviousMonthUsers();

  if (previousMonthUsers === 0) {
    return currentMonthUsers > 0 ? 100 : 0;
  }

  const percentageChange =
    ((currentMonthUsers - previousMonthUsers) / previousMonthUsers) * 100;
  return parseFloat(percentageChange.toFixed(2));
}
