import { auth } from "@/auth";
import { Section } from "@/components/Section";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NewPasswordForm } from "./NewPasswordForm";

export default async function NewPasswordPage() {
  const session = await auth();

  if (session?.user.id) {
    return redirect("/");
  }

  return (
    <Section className="flex h-screen w-full flex-col items-center justify-center">
      <Card className="m-auto max-w-xl overflow-hidden w-full">
        <CardHeader className="mt-4 items-center space-y-2">
          <CardTitle>Votre nouveau mot de passe</CardTitle>

          <CardDescription>
            Pour réinitialiser votre mot de passe, veuillez compléter le champ
            ci-dessous.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NewPasswordForm />
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
