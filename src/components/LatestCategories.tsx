import { truncate } from "@/lib/truncate";
import { CategoryType } from "@/types/CategorySchema";
import { ArrowRight, MoveRight } from "lucide-react";
import Link from "next/link";
import { Section } from "./Section";
import { Button } from "./ui/button";

export type LatestCategoriesProps = {
  categories: CategoryType[];
};

export const LatestCategories = (props: LatestCategoriesProps) => {
  return (
    <Section className="space-y-6">
      <div className="flex items-center justify-between pr-3">
        <h3 className=" text-2xl font-semibold tracking-tight">
          Les catégories
        </h3>

        {props.categories?.length >= 2 && (
          <Link
            href="/categories"
            className="group flex items-center gap-2 text-sm transition duration-200 ease-in-out hover:text-foreground/80"
          >
            Tout voir
            <span
              aria-hidden="true"
              className="inline-block translate-x-0 transition-transform duration-200 ease-in-out group-hover:translate-x-1"
            >
              <MoveRight className="size-4" />
            </span>
          </Link>
        )}
      </div>
      <div className="grid min-h-full grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 ">
        {props.categories.slice(0, 2).map((category) => {
          return (
            <div className="relative flex h-96">
              <img
                src={category.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="relative flex w-full flex-col items-start justify-end bg-black bg-opacity-40 p-8 sm:p-12">
                <h2 className="text-2xl font-medium text-white text-opacity-75">
                  {category.name}
                </h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: truncate(category.description, 255),
                  }}
                  className="mt-2 text-sm font-medium text-white words-wrap"
                ></div>
                <Button
                  size={"lg"}
                  variant="expandIcon"
                  className="group mt-4 bg-white text-gray-900 hover:bg-white"
                  Icon={ArrowRight}
                  iconPlacement="right"
                  asChild
                >
                  <Link href={`/produits?category=${category.id}`}>
                    Découvrir
                  </Link>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
