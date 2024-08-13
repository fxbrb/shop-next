import { auth } from "@/auth";
import { Section } from "@/components/Section";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CancelPage() {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/connexion");
  }

  return (
    <Section className="flex items-center justify-center flex-col gap-5">
      <h1 className="text-3xl font-semibold tracking-tight">
        Vous pouvez reprendre votre commande à tout moment ci-dessous
      </h1>

      <div className="flex items-center gap-2">
        <Link
          href="/"
          className={buttonVariants({
            variant: "outline",
          })}
        >
          Accueil
        </Link>
        <Link href="/panier" className={buttonVariants()}>
          Mon panier
        </Link>
      </div>
    </Section>
  );
}
