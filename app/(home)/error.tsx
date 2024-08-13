"use client"; // Error components must be Client Components

import { Section } from "@/components/Section";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Section>
      <Alert variant="destructive" className="max-w-xl w-full mx-auto">
        <TriangleAlert className="size-4" />
        <AlertTitle>Quelque chose s'est mal passé !</AlertTitle>
        <AlertDescription>
          <p>Veuillez réessayer ultérieurement.</p>

          <div className="flex items-center gap-3 mt-2 justify-end">
            <Button
              onClick={() => reset()}
              variant={"outline"}
              className="text-black dark:text-white"
            >
              Retry
            </Button>
            <Link href={"/"} className={buttonVariants()}>
              Accueil
            </Link>
          </div>
        </AlertDescription>
      </Alert>
    </Section>
  );
}
