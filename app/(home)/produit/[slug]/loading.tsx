import { Section } from "@/components/Section";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductPageLoading() {
  return (
    <Section className="flex flex-col gap-16 py-8 md:py-10 w-full">
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-16">
        <div className="flex-1">
          <div className="relative w-full pb-[100%] overflow-hidden rounded-lg bg-neutral-300">
            <div className="absolute inset-0">
              <Skeleton className="w-full h-full" />
            </div>
          </div>

          <div className="hidden gap-4 text-clip px-1 py-3 sm:flex">
            <div className="relative size-20 rounded-md bg-neutral-300">
              <Skeleton className="w-full h-full" />
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-[170px]" />

          <Skeleton className="h-4 w-[180px]" />
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="w-full h-[300px] my-4" />
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-64 mt-3" />

          <div className="mt-10 flex items-center space-x-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </Section>
  );
}
