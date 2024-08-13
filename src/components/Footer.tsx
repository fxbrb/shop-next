import { Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { Section } from "./Section";
import { CustomIcons } from "./icons/CustomIcons";
import { Button, buttonVariants } from "./ui/button";

export const Footer = () => {
  return (
    <footer>
      <Section>
        <div className="py-6 sm:py-8 grid md:grid-cols-[1.5fr_0.5fr_0.5fr] gap-12">
          <div className="flex flex-col gap-4">
            <Link href="/" className="size-20 -ml-3">
              <CustomIcons name="logo" />
            </Link>
            <p>
              Notre site propose une sélection de bougies faites maison,
              naturelles et de qualité, pour apporter une touche de douceur et
              de bien-être à votre espace.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h5>Site</h5>
            <Link
              href="/"
              className="transition-all text-foreground/70 hover:text-foreground w-fit"
            >
              Accueil
            </Link>
            <Link
              href="/produits"
              className="transition-all text-foreground/70 hover:text-foreground w-fit"
            >
              Produits
            </Link>
            <Link
              href="/categories"
              className="transition-all text-foreground/70 hover:text-foreground w-fit"
            >
              Categories
            </Link>
            <Link
              href="/contact"
              className="transition-all text-foreground/70 hover:text-foreground w-fit"
            >
              Contact
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h5>Legal</h5>
            <Link
              href="/mentions-legales"
              className="transition-all text-foreground/70 hover:text-foreground w-fit"
            >
              Mentions légales
            </Link>
            <Link
              href="/conditions-generales"
              className="transition-all text-foreground/70 hover:text-foreground w-fit"
            >
              Conditions
            </Link>
            <Link
              href="/cookie-policy"
              className="transition-all text-foreground/70 hover:text-foreground w-fit"
            >
              Politique de confidentialité
            </Link>
            <Link
              href="/cookie-policy"
              className="transition-all text-foreground/70 hover:text-foreground w-fit"
            >
              Politique de cookies
            </Link>
          </div>
        </div>
        <div className="py-6 sm:py-8 border-t flex flex-col md:flex-row md:gap-2 gap-6 justify-between md:items-center">
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Instagram size={20} strokeWidth={1.5} />
            </Button>
            <Button variant="outline" size="icon">
              <Twitter size={20} strokeWidth={1.5} />
            </Button>

            <Link
              href="https://www.tiktok.com/@marie6809"
              target="_blank"
              className={buttonVariants({
                variant: "outline",
                size: "icon",
              })}
            >
              <CustomIcons name="tiktok" size={20} />
            </Link>
          </div>
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} Maria Rosaria Tous droits
            réservés.
          </p>
        </div>
      </Section>
    </footer>
  );
};
