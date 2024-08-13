"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SetPerfumeProps = {
  perfumes: string[];
  handlePerfumeSelect: (value: string) => void;
};

export const SetPerfume = (props: SetPerfumeProps) => {
  return (
    <div className="space-y-2">
      <Label>Sélectionnez votre choix de parfum:</Label>
      <Select onValueChange={props.handlePerfumeSelect}>
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Aucun parfum sélectionner" />
        </SelectTrigger>
        <SelectContent>
          {props.perfumes.map((perfum) => (
            <SelectItem value={perfum}>{perfum}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
