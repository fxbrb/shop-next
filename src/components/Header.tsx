import { auth } from "@/auth";
import Link from "next/link";
import { CartButton } from "./CartButton";
import { Menu } from "./Menu";
import { MobileMenu } from "./MobileMenu";
import { AuthButton } from "./auth/AuthButton";
import { CustomIcons } from "./icons/CustomIcons";
import { ThemeToggle } from "./theme/ThemeToggle";

export const Header = async () => {
  const session = await auth();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-20 max-w-screen-xl items-center justify-between m-auto lg:px-8 px-4">
        <Link href="/" className="size-16">
          <CustomIcons name="logo" />
        </Link>

        <Menu />
        <MobileMenu />
        <div className="flex items-center space-x-2 justify-end">
          <div className="flex items-center gap-2">
            <AuthButton user={session?.user} />
            <CartButton />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
