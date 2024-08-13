import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export type SectionProps = PropsWithChildren<{
  className?: string;
  id?: string;
}>;

export const Section = (props: SectionProps) => {
  return (
    <section
      id={props.id}
      className={cn(
        "max-w-screen-xl m-auto py-10 lg:px-8 px-4",
        props.className
      )}
    >
      {props.children}
    </section>
  );
};
