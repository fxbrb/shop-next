"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getCurrentMonthSoldItems,
  getSoldItemsPercentageChange,
} from "@/lib/sales-calcul";
import { CreditCard } from "lucide-react";
import { useEffect, useState } from "react";

export const Sales = () => {
  const [currentMonthSoldItems, setCurrentMonthSoldItems] = useState(0);
  const [soldItemsPercentageChange, setSoldItemsPercentageChange] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const soldItems = await getCurrentMonthSoldItems();
      const change = await getSoldItemsPercentageChange();
      setCurrentMonthSoldItems(soldItems);
      setSoldItemsPercentageChange(change);
    }
    fetchData();
  }, []);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Sales</CardTitle>
        <CreditCard className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+{currentMonthSoldItems}</div>
        <p className="text-xs text-muted-foreground">
          {" "}
          Variation par rapport au mois précédent :{" "}
          {soldItemsPercentageChange > 0 ? "+" : ""}
          {soldItemsPercentageChange}%
        </p>
      </CardContent>
    </Card>
  );
};
