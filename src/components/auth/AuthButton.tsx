"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Heart, LogOut, Settings, Shield, Truck, User } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { Loader } from "../ui/loader";

export type AuthButtonProps = {
  user?: Session["user"];
};

export const AuthButton = (props: AuthButtonProps) => {
  if (!props.user?.id) {
    return (
      <>
        <Link href="/connexion" className="mr-6 text-sm">
          Se connecter
        </Link>
        <Link href="/inscription" className={cn(buttonVariants(), "text-sm")}>
          S'inscrire
        </Link>
      </>
    );
  }

  const mutation = useMutation({
    mutationFn: async () => {
      signOut();
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <User className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="sm:w-60 w-56 rounded-xl p-1"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="px-3 py-2.5 font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none truncate">
              {props.user.firstname}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {props.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="group cursor-pointer gap-2 px-3 py-2.5"
        >
          <Link href="/mon-compte">
            <Settings className="size-4" />
            Mon compte
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="group cursor-pointer gap-2 px-3 py-2.5"
        >
          <Link href="/mon-compte/favoris">
            <Heart className="size-4" />
            Mes favoris
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="group cursor-pointer gap-2 px-3 py-2.5"
        >
          <Link href="/mon-compte/commandes">
            <Truck className="size-4" />
            Mes commandes
          </Link>
        </DropdownMenuItem>
        {props.user.role === "ADMIN" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              asChild
              className="group cursor-pointer gap-2 px-3 py-2.5"
            >
              <Link href="/admin">
                <Shield className="size-4" />
                Admin
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="group cursor-pointer gap-2 px-3 py-2.5"
          onClick={() => {
            mutation.mutate();
          }}
        >
          {mutation.isPending ? (
            <Loader className="size-4" />
          ) : (
            <LogOut className="size-4" />
          )}
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
