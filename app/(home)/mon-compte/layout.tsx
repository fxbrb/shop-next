import { Section } from "@/components/Section";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart, LogOut, Truck, User } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "../../../src/auth";
import { AccountTabs } from "./AccountTabs";

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user.id) {
    return redirect("/connexion");
  }

  const tabs = [
    {
      label: "Informations du compte",
      href: "/mon-compte",
      icon: <User className="size-4" />,
    },
    {
      label: "Commandes",
      href: "/mon-compte/commandes",
      icon: <Truck className="size-4" />,
    },
    {
      label: "Liste de souhaits",
      href: "/mon-compte/favoris",
      icon: <Heart className="size-4" />,
    },
  ];

  return (
    <Section className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 mb-2 max-sm:flex-col">
        <h2 className="text-3xl font-extrabold tracking-tight">Mon compte</h2>

        <div className="flex items-center gap-2">
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button variant={"outline"} type="submit">
              <LogOut className="mr-2 size-4" />
              Déconnexion
            </Button>
          </form>

          {session.user.role === "ADMIN" && (
            <Link
              href="/admin"
              className={cn(
                buttonVariants({
                  variant: "link",
                }),
                "text-foreground"
              )}
            >
              Administration
            </Link>
          )}
        </div>
      </div>
      <AccountTabs tabs={tabs} />

      <div className="my-5">{children}</div>
    </Section>
  );
}
