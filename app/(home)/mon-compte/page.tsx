import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AddressForm } from "./AddressForm";
import { PasswordForm } from "./PasswordForm";
import { SettingsForm } from "./SettingsForm";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user.id) {
    return redirect("/");
  }

  const addresses = await prisma.address.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      isDefault: "desc",
    },
  });

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader>
          <CardTitle>Mes informations</CardTitle>
        </CardHeader>
        <CardContent>
          <SettingsForm user={session?.user} />
        </CardContent>
      </Card>

      <AddressForm addresses={addresses} user={session?.user} />

      {!session.user.isOAuth && (
        <Card>
          <CardHeader>
            <CardTitle>Changement de mot de passe</CardTitle>
          </CardHeader>
          <CardContent>
            <PasswordForm />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
