"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = {
  label: string;
  href: string;
  icon?: JSX.Element;
};

export type AccountTabsProps = {
  tabs: Tab[];
};

export const AccountTabs = (props: AccountTabsProps) => {
  const pathname = usePathname();

  return (
    <div className="flex h-auto w-full flex-wrap items-center justify-start rounded-md bg-muted p-1 text-muted-foreground gap-2">
      {props.tabs.map((tab, index) => (
        <Link
          key={`account-tab-${index}`}
          href={tab.href}
          className={cn(
            pathname === tab.href && "bg-background text-foreground shadow-sm",
            "inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 flex-1 hover:bg-background hover:text-foreground hover:shadow-sm"
          )}
        >
          {tab.icon}
          {tab.label}
        </Link>
      ))}
    </div>
  );
};
