"use client";

import { truncate } from "@/lib/truncate";
import { cn } from "@/lib/utils";
import { ReviewWithUserAndProductType } from "@/types/ReviewsSchema";
import { formatDistance, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Stars } from "../../../app/(home)/produit/[slug]/_components/Stars";

export const InfiniteMovingCards = ({
  reviews,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  reviews: ReviewWithUserAndProductType[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  console.log(reviews);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div ref={containerRef} className={cn("scroller relative z-20", className)}>
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {reviews.map((item, idx) => (
          <li
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-b-0 border-border px-8 py-6 md:w-[450px]"
            key={item.id}
          >
            <div className="flex flex-col">
              <div className="mb-4">
                <Stars rating={item.rating} size={14} />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">{item.user.firstname}</p>

                <p className="text-xs text-muted-foreground">
                  {formatDistance(subDays(item.createdAt!, 0), new Date(), {
                    addSuffix: true,
                    locale: fr,
                  })}
                </p>
              </div>

              <q className="my-6 text-sm text-muted-foreground">
                {truncate(item.message, 150)}
              </q>

              <div className="flex justify-end">
                <Link
                  href={`/produit/${item.product.slug}`}
                  className="flex gap-2"
                >
                  <p className="text-xs font-bold">{item.product.name}</p>

                  <div className="relative size-10">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="size-full rounded-md object-cover object-center"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
