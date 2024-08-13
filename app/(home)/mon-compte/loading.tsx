import { Section } from "@/components/Section";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Section className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between gap-4 mb-2 max-sm:flex-col">
        <Skeleton className="h-4 w-[170px]" />

        <Skeleton className="h-10 w-[150px]" />
      </div>

      <Skeleton className="h-10 w-full" />

      <div className="my-5">
        <div className="flex flex-col gap-5">
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>
    </Section>
  );
}
