import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { CustomIcons } from "../icons/CustomIcons";
import { Button } from "../ui/button";
import { Menu } from "./Menu";
import { SidebarToggle } from "./SidebarToggle";

export const Sidebar = () => {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        sidebar.isOpen === false ? "w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle isOpen={sidebar.isOpen} setIsOpen={sidebar.setIsOpen} />

      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            sidebar.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant={"link"}
          asChild
        >
          <Link href="/">
            <CustomIcons name="logo" className="size-16" />
          </Link>
        </Button>

        <Menu isOpen={sidebar.isOpen} />
      </div>
    </aside>
  );
};
