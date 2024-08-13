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
import { Socials } from "../Socials";
import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user.id) {
    return redirect("/");
  }

  return (
    <Section className="flex h-screen w-full flex-col items-center justify-center">
      <Card className="max-w-xl overflow-hidden w-full">
        <CardHeader className="mt-4 items-center">
          <CardTitle>Connexion</CardTitle>
          <CardDescription>
            Entrez votre email ci-dessous pour vous connecter à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="mt-6 flex w-full flex-col gap-6 sm:gap-8">
            <div className="relative flex w-full justify-center">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
              <span className="relative z-10 bg-card px-3">
                <p className="font-thin text-muted-foreground">OU</p>
              </span>
            </div>

            <div className="w-full">
              <Socials />
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-center overflow-hidden bg-muted pt-6">
          <div className="text-center text-sm">
            Vous n'avez pas de compte ?{" "}
            <Link
              href="/inscription"
              className="font-semibold text-black dark:text-white  underline-offset-2 hover:underline"
            >
              S'inscrire
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Section>
  );
}
