import { auth } from "@/auth";
import { AuthButton } from "../auth/AuthButton";
import { ThemeToggle } from "../theme/ThemeToggle";

export type NavbarProps = {
  title: string;
};

export const Navbar = async (props: NavbarProps) => {
  const session = await auth();
  return (
    <header className="sticky top-0 z-10 w-full bg-background shadow dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          {/* <SheetMenu /> */}
          <h1 className="font-bold">{props.title}</h1>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <ThemeToggle />
          <AuthButton user={session?.user} />
        </div>
      </div>
    </header>
  );
};
