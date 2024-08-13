import { auth } from "@/auth";
import { Section } from "@/components/Section";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SuccessClient } from "./SuccessClient";

export default async function SuccessPage() {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/connexion");
  }

  const order = await prisma.order.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: session?.user.id,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    return (
      <Section>
        <div>Aucune commande trouvée.</div>
      </Section>
    );
  }

  const expirationTime = new Date(order.updatedAt);
  expirationTime.setMinutes(expirationTime.getMinutes() + 30);

  if (new Date() > expirationTime) {
    return (
      <Section className="flex items-center justify-center flex-col gap-3">
        <p>Aucune commande trouvée.</p>
        <Link href="/mon-compte/commandes" className={buttonVariants()}>
          Voir mes commandes
        </Link>
      </Section>
    );
  }

  return (
    <Section>
      <SuccessClient order={order} />
    </Section>
  );
}
