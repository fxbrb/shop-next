import { auth } from "@/auth";
import { ContentLayout } from "@/components/admin-panel/ContentLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Benefits } from "./Benefits";
import { RecentSales } from "./RecentSales";
import { Sales } from "./Sales";
import { UserRegistrations } from "./UserRegistrations";

export default async function AdminPage() {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    return redirect("/");
  }

  return (
    <ContentLayout title={"Maria Rosaria"}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="rounded-lg border-none mt-6">
        <CardContent className="p-6 flex flex-col gap-4 md:gap-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            <Benefits />
            <UserRegistrations />
            <Sales />
          </div>

          <RecentSales />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
