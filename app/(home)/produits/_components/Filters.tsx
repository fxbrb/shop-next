"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryType } from "@/types/CategorySchema";
import { ListRestart } from "lucide-react";
import { useRouter } from "next/navigation";

export type FiltersProps = {
  categories: CategoryType[];
  selectedCategory: string;
  selectedSort: string;
};

export const Filters = (props: FiltersProps) => {
  const router = useRouter();

  const handleCategoryChange = (value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("category", value);
    searchParams.set("page", "1");
    router.push(`/produits?${searchParams.toString()}`);
  };

  const handleSortChange = (value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("sort", value);
    router.push(`/produits?${searchParams.toString()}`);
  };

  const clearFilters = () => {
    router.push("/produits");
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="space-y-2 w-full">
        <Label>Catégories</Label>
        <Select
          value={props.selectedCategory}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="lg:w-60">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tout</SelectItem>
            {props.categories.map((category) => (
              <SelectItem value={category.id ?? ""} key={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 w-full">
        <Label>Trier par</Label>
        <Select value={props.selectedSort} onValueChange={handleSortChange}>
          <SelectTrigger className="lg:w-60">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-a-z">Alphabétique, de A à Z</SelectItem>
            <SelectItem value="name-z-a">Alphabétique, de Z à A</SelectItem>
            <SelectItem value="price_asc">Prix: faible à élevé</SelectItem>
            <SelectItem value="price_desc">Prix: élevé à faible</SelectItem>
            <SelectItem value="old">A partir du plus ancien</SelectItem>
            <SelectItem value="new">A partir du plus récent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={clearFilters} className="mt-8">
        <ListRestart className="size-4" />
      </Button>
    </div>
  );
};
