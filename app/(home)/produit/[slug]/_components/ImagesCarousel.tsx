"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImagesCarousel({ images }: { images: string[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeThumbnail, setActiveThumbnail] = useState([0]);

  const updatePreview = (index: number) => {
    api?.scrollTo(index);
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("slidesInView", (e) => {
      setActiveThumbnail(e.slidesInView());
    });
  }, [api]);
  return (
    <Carousel setApi={setApi} opts={{ loop: true }}>
      <CarouselContent>
        {images.map((img) => {
          return (
            <CarouselItem key={img}>
              {/* <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-neutral-300"> */}
              <div className="relative overflow-hidden rounded-lg aspect-square h-full">
                <Image
                  className="absolute inset-0 size-full rounded-lg bg-gray-50 object-cover object-center"
                  fill
                  src={img}
                  priority
                  alt="product image"
                  sizes="(max-width: 600px) 100vw, 600px"
                />
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <div className="hidden gap-4 text-clip px-1 py-3 sm:flex">
        {images.map((img, index) => {
          return (
            <div
              key={img}
              className="relative size-20 rounded-md bg-neutral-300"
            >
              <Image
                onClick={() => updatePreview(index)}
                priority
                className={cn(
                  index === activeThumbnail[0]
                    ? "ring-2 ring-offset-2 ring-primary ring-offset-background"
                    : "",
                  "rounded-md transition-all object-cover object-center duration-300 ease-in-out cursor-pointer hover:opacity-75"
                )}
                fill
                src={img}
                alt={`${img}-${index}`}
              />
            </div>
          );
        })}
      </div>
    </Carousel>
  );
}
