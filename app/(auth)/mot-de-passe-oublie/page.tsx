import { auth } from "@/auth";
import { Section } from "@/components/Section";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export default async function ForgotPasswordPage() {
  const session = await auth();

  if (session?.user.id) {
    return redirect("/");
  }

  return (
    <Section className="flex h-screen w-full flex-col items-center justify-center">
      <Card className="m-auto max-w-xl overflow-hidden w-full">
        <CardHeader className="mt-4 items-center space-y-2">
          <CardTitle>Mot de passe oublié ?</CardTitle>
          <div className="flex flex-col space-y-1.5 text-center text-sm text-muted-foreground">
            <p>Saisissez l'adresse e-mail de votre compte.</p>

            <p>
              Vous recevrez ensuite par e-mail un lien vers une page vous
              permettant de créer facilement votre nouveau mot de pase.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
        <CardFooter className="justify-center overflow-hidden bg-muted pt-6">
          <div className="text-center text-sm">
            <Link
              href="/connexion"
              className="font-bold text-black dark:text-white underline-offset-2 hover:underline"
            >
              Annuler
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Section>
  );
}
