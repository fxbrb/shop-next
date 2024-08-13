import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Section } from "./Section";
import { FadeAnimation } from "./animations/FadeAnimation";
import { buttonVariants } from "./ui/button";

export const Hero = () => {
  return (
    <Section className="flex flex-col py-16 md:py-24">
      <div className="flex flex-col items-center gap-6 pb-8 text-center">
        <FadeAnimation direction="up" staggerChildren={0.1}>
          <h1 className="text-balance bg-gradient-to-br from-black from-30% to-black/60 bg-clip-text py-3 text-5xl font-bold leading-none tracking-tighter text-transparent dark:from-white dark:to-white/40 sm:text-3xl lg:text-5xl">
            Découvrez l'Art de la Bougie
          </h1>
          <p className="text-balance text-lg tracking-tight text-gray-400 md:text-xl">
            Découvrez nos bougies artisanales, faites maison avec des
            ingrédients naturels pour une ambiance chaleureuse et apaisante.
          </p>

          <Link
            className={cn(
              buttonVariants({
                size: "sm",
              }),
              "relative group shadow px-4 py-2 transition-all duration-300 gap-2 font-semibold tracking-tighter hover:ring-2 hover:ring-primary hover:ring-offset-2"
            )}
            href="#latest-products"
          >
            <span>Découvrir</span>

            <ChevronRight className="size-4 translate-x-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
          </Link>

          <div className="relative mx-auto mt-24 size-full max-w-[768px] rounded-xl border shadow-2xl">
            <div className="absolute inset-0 bottom-1/2 h-full w-full transform-gpu [filter:blur(120px)] [background-image:linear-gradient(to_bottom,#E190B5,transparent_30%)] dark:[background-image:linear-gradient(to_bottom,#ffffff,transparent_30%)]"></div>
            <Image
              loading="lazy"
              width={1280}
              height={1024}
              src="/hero-image.png"
              alt="hero picture"
              className="relative block size-full rounded-xl"
            />
          </div>
        </FadeAnimation>
      </div>
    </Section>
  );
};
