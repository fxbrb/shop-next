"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getCurrentMonthUsers,
  getUsersPercentageChange,
} from "@/lib/new-user-count";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";

export const UserRegistrations = () => {
  const [currentMonthUsers, setCurrentMonthUsers] = useState(0);
  const [userPercentageChange, setUserPercentageChange] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const users = await getCurrentMonthUsers();
      const change = await getUsersPercentageChange();
      setCurrentMonthUsers(users);
      setUserPercentageChange(change);
    }
    fetchData();
  }, []);
  return (
    <Card x-chunk="dashboard-01-chunk-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Inscriptions</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+{currentMonthUsers}</div>
        <p className="text-xs text-muted-foreground">
          Variation par rapport au mois précédent :{" "}
          {userPercentageChange > 0 ? "+" : ""}
          {userPercentageChange}%
        </p>
      </CardContent>
    </Card>
  );
};
