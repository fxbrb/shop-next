"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export type StarsProps = {
  rating: number;
  reviewCount?: number;
  size?: number;
};

export const Stars = (props: StarsProps) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          size={props.size}
          key={star}
          className={cn(
            "text-[#f1c645] bg-transparent transition-all duration-300 ease-in-out",
            props.rating >= star ? "fill-[#f1c645]" : "fill-transparent"
          )}
        />
      ))}

      {props.reviewCount && (
        <span className="ml-2 text-sm font-semibold text-secondary-foreground">
          {props.reviewCount}
        </span>
      )}
    </div>
  );
};
