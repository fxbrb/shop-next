"use client";

import { CustomIcons } from "@/components/icons/CustomIcons";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export const Socials = () => {
  return (
    <div className="flex items-center gap-2 max-md:flex-col">
      <Button
        variant={"outline"}
        className="w-full flex-1 gap-2"
        onClick={() => {
          signIn("google", {
            redirect: false,
            callbackUrl: "/",
          });
        }}
      >
        <CustomIcons className="size-4" name="google" />
        Connectez-vous avec Google
      </Button>
    </div>
  );
};
