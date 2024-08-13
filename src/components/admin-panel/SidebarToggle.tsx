import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";

export type SidebarToggleProps = {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
};

export const SidebarToggle = (props: SidebarToggleProps) => {
  return (
    <div className="invisible lg:visible absolute top-[12px] -right-[16px] z-20">
      <Button
        onClick={() => props.setIsOpen?.()}
        className="rounded-md size-8"
        variant={"outline"}
        size={"icon"}
      >
        <ChevronLeft
          className={cn(
            "size-4 transition-transform ease-in-out duration-700",
            props.isOpen === false ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>
    </div>
  );
};
