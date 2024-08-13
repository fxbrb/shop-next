import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface PerfumeInputProps {
  value: string[];
  onChange: (perfumes: string[]) => void;
}

export const PerfumeInput: React.FC<PerfumeInputProps> = ({
  value,
  onChange,
}) => {
  const [perfumes, setPerfumes] = useState<string[]>(value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const inputValue = e.currentTarget.value.trim();
    if (!inputValue) return;
    if (perfumes.includes(inputValue)) {
      e.currentTarget.value = "";
      return;
    }
    if (perfumes.length >= 10) {
      e.currentTarget.value = "";
      return;
    }
    setPerfumes([...perfumes, inputValue]);
    e.currentTarget.value = "";
    e.preventDefault();
    e.currentTarget.focus();
    onChange([...perfumes, inputValue]);
  };

  const removePerfume = (index: number) => {
    const newPerfumes = [...perfumes];
    newPerfumes.splice(index, 1);
    setPerfumes(newPerfumes);
    onChange(newPerfumes);
  };

  const clearPerfumes = () => {
    setPerfumes([]);
    onChange([]);
  };

  return (
    <div
      className="w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm
    "
    >
      <div className="flex max-w-full flex-wrap items-center gap-2">
        {perfumes.map((perfume, index) => (
          <div
            className="flex items-center gap-2 rounded-lg bg-accent px-2 py-0.5"
            key={index}
          >
            <span className="text-sm">{perfume}</span>
            <span
              className="cursor-pointer"
              onClick={() => removePerfume(index)}
            >
              &times;
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          className="mt-3 h-6 w-full rounded-md border-none px-3 shadow-sm outline-none focus-visible:border focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-0"
          placeholder="Entrez le nom de votre parfum"
          onKeyDown={handleKeyDown}
        />

        {perfumes.length >= 10 && (
          <p className="text-sm text-muted-foreground/70">10 parfums max</p>
        )}
      </div>
      {perfumes.length >= 2 && (
        <Button
          type="button"
          size={"sm"}
          variant={"outline"}
          className="mt-3 w-full"
          onClick={clearPerfumes}
        >
          Tout effacer
        </Button>
      )}
    </div>
  );
};
