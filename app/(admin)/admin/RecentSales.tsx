"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRecentOrders } from "@/lib/orders";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  id: string;
  firstname: string | null;
  lastname: string | null;
  email: string;
  phone: string | null;
  birthday: Date | null;
  password: string | null;
  image: string | null;
  updatedAt: Date;
}

interface Order {
  id: string;
  isPaid: boolean;
  user: User;
  orderItems: any[];
  createdAt: Date;
  total: number;
}

export const RecentSales = () => {
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchRecentOrders() {
      const orders = await getRecentOrders();
      setRecentOrders(orders);
    }
    fetchRecentOrders();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Commandes récentes</CardTitle>
          <CardDescription>
            Les transactions récentes de votre magasin.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="#">
            Voir Tout
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Utilisateur</TableHead>
              <TableHead className="">Type</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="">Date</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="font-medium">
                    {order.user.firstname} {order.user.lastname}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {order.user.email}
                  </div>
                </TableCell>
                <TableCell className="">Vente</TableCell>
                <TableCell className="">
                  <Badge className="text-xs" variant="outline">
                    {order.isPaid ? "Payé" : "En attente"}
                  </Badge>
                </TableCell>
                <TableCell className="">
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  {order.total.toFixed(2)} €
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
