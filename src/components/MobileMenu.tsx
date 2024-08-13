"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CustomIcons } from "./icons/CustomIcons";
import { Button } from "./ui/button";

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="size-4" stroke="currentColor" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <VisuallyHidden.Root>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
        </VisuallyHidden.Root>

        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <CustomIcons name="logo" className="size-14" />
        </MobileLink>

        <div className="flex flex-col space-y-3 pb-10 pl-6 my-4">
          <MobileLink href="/" onOpenChange={setOpen}>
            Accueil
          </MobileLink>
          <MobileLink href="/produits" onOpenChange={setOpen}>
            Produits
          </MobileLink>
          <MobileLink href="/categories" onOpenChange={setOpen}>
            Catégories
          </MobileLink>
          <MobileLink href="/#about" onOpenChange={setOpen}>
            A propos
          </MobileLink>
          <MobileLink href="/contact" onOpenChange={setOpen}>
            Contact
          </MobileLink>
        </div>
      </SheetContent>
    </Sheet>
  );
};

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
