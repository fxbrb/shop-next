import { Section } from "@/components/Section";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsPageLoading() {
  return (
    <Section>
      <Skeleton className="h-4 w-28" />

      <div className="flex justify-between lg:items-center space-y-3 py-8 max-lg:flex-col">
        <Skeleton className="h-9 w-40" />

        <div className="flex items-center space-x-3">
          <Skeleton className="w-80 h-10" />
          <Skeleton className="w-80 h-10" />
          <Skeleton className="w-10 h-10" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <Skeleton className="rounded-lg aspect-square lg:h-[350px] w-full" />
      </div>
    </Section>
  );
}
