import { auth } from "@/auth";
import { Section } from "@/components/Section";
import { prisma } from "@/lib/prisma";
import { CartDetails } from "./_components/CartDetails";

export default async function CartPage() {
  const session = await auth();

  const products = await prisma.product.findMany();

  return (
    <Section>
      <CartDetails user={session?.user} products={products} />
    </Section>
  );
}
