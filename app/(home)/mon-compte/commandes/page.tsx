import { auth } from "@/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatPrice from "@/lib/format-price";
import { prisma } from "@/lib/prisma";
import { formatDistance, subMinutes } from "date-fns";
import { fr } from "date-fns/locale";
import { Bell, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function OrdersPage() {
  const session = await auth();

  const orders = await prisma.order.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Mes commandes</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <Bell className="size-4" />

            <div className="flex items-center justify-between gap-10">
              <div className="flex flex-col gap-1.5">
                <AlertTitle>Vous n'avez aucune commande en cours!</AlertTitle>
                <AlertDescription>
                  Il semble que vous n'ayez pas encore passé de commande.
                  Parcourez nos produits et passez votre première commande dès
                  maintenant.
                </AlertDescription>
              </div>

              <Link href="/produits" className={buttonVariants()}>
                Parcourir les produits
              </Link>
            </div>
          </Alert>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mes commandes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Une liste de vos commandes récentes</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Numéro de commande</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="uppercase">#{order.id}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{formatPrice(order.total)}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      order.isPaid
                        ? "bg-green-700 hover:bg-green-800"
                        : "bg-yellow-700 hover:bg-yellow-800"
                    }
                  >
                    {order.isPaid ? "Payé" : "Non payé"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {formatDistance(subMinutes(order.createdAt!, 0), new Date(), {
                    addSuffix: true,
                    locale: fr,
                  })}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"}>
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <DialogTrigger>
                            <Button className="w-full" variant={"ghost"}>
                              View Details
                            </Button>
                          </DialogTrigger>
                        </DropdownMenuItem>
                        {order.receiptUrl && (
                          <DropdownMenuItem>
                            <Button
                              asChild
                              className="w-full"
                              variant={"ghost"}
                            >
                              <Link href={order.receiptUrl} target="_blank">
                                Télécharger la facture
                              </Link>
                            </Button>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent className="rounded-md max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>
                          Détails de la commande{" "}
                          <span className="uppercase">#{order.id}</span>
                        </DialogTitle>
                        <DialogDescription>
                          Le total de votre commande est de{" "}
                          {formatPrice(order.total)}
                        </DialogDescription>
                      </DialogHeader>
                      <Card className="overflow-auto p-2 flex flex-col gap-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Image</TableHead>
                              <TableHead>Prix</TableHead>
                              <TableHead>Produit</TableHead>
                              <TableHead>Parfum</TableHead>
                              <TableHead>Quantité</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {order.orderItems.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell>
                                  <Image
                                    src={item.product.images[0]}
                                    width={48}
                                    height={48}
                                    alt={item.product.name}
                                    className="rounded-md"
                                  />
                                </TableCell>
                                <TableCell>
                                  {formatPrice(item.product.price)}
                                </TableCell>
                                <TableCell>{item.product.name}</TableCell>
                                <TableCell>{item.perfume}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Card>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
