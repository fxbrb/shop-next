"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getCurrentMonthSales,
  getSalesPercentageChange,
} from "@/lib/profit-calcul";
import { Euro } from "lucide-react";
import { useEffect, useState } from "react";

export const Benefits = () => {
  const [currentMonthSales, setCurrentMonthSales] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const sales = await getCurrentMonthSales();
      const change = await getSalesPercentageChange();
      setCurrentMonthSales(sales);
      setPercentageChange(change);
    }
    fetchData();
  }, []);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Revenue Total</CardTitle>
        <Euro className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          +{currentMonthSales.toFixed(2)} €
        </div>
        <p className="text-xs text-muted-foreground">
          Variation par rapport au mois précédent :{" "}
          {percentageChange > 0 ? "+" : ""}
          {percentageChange}%
        </p>
      </CardContent>
    </Card>
  );
};
