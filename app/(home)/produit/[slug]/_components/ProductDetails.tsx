"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import formatPrice from "@/lib/format-price";

import { useCart } from "@/hooks/use-cart";
import { useFavorite } from "@/hooks/use-favorite";
import { ProductType } from "@/types/ProductSchema";
import { ReviewWithUserType } from "@/types/ReviewsSchema";
import { Heart, HeartOff, ShoppingCart } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import ImagesCarousel from "./ImagesCarousel";
import { SetPerfume } from "./SetPerfume";
import { SetQuantity } from "./SetQuantity";
import { Stars } from "./Stars";

export type ProductDetailsProps = {
  product: ProductType;
  reviews: ReviewWithUserType[];
};

export const ProductDetails = (props: ProductDetailsProps) => {
  const price = props.product?.price - props.product?.discount;
  const [perfume, setPerfume] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart, cart } = useCart();
  const { addToFavorite, favorite, removeFromFavorite } = useFavorite();
  const isInFavorite = favorite.some((i) => i.id === props.product.id);
  const reviews = props.reviews.map((review) => review.rating);
  const totalRating =
    reviews.reduce((acc, review) => acc + review, 0) / reviews.length;

  const handlePerfumeSelect = useCallback(
    (value: string) => {
      setPerfume(value);
    },
    [perfume]
  );

  const handleAddToCart = () => {
    if (quantity > props.product.stock) {
      toast.error(
        `Il reste que ${props.product.stock} ${props.product.name} en stock!`
      );
      return;
    }

    if (
      props.product.perfumes &&
      props.product.perfumes.length > 0 &&
      !perfume
    ) {
      toast.error(`Veuillez sélectionner un parfum`);
      return;
    }

    addToCart({
      id: props.product.id ?? "",
      name: props.product.name,
      slug: props.product.slug,
      description: props.product.description,
      images: props.product.images,
      price: props.product.price,
      discount: props.product.discount,
      stock: props.product.stock,
      quantity: quantity,
      perfume: perfume,
    });
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-16">
      <div className="flex-1">
        <ImagesCarousel images={props.product.images} />
      </div>
      <div className="flex flex-1 flex-col">
        <h2 className="mb-1 truncate text-2xl font-bold">
          {props.product.name}
        </h2>

        <div className="flex items-center gap-2">
          <Stars rating={totalRating} size={15} />
          <span className="text-sm">({props.reviews.length})</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="py-2 text-2xl font-medium">
            {props.product.discount > 0 ? (
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-medium">{formatPrice(price)}</h2>
                <Badge className="flex gap-4" variant="destructive">
                  <p className="line-through">
                    {formatPrice(props.product?.price)}
                  </p>
                </Badge>
              </div>
            ) : (
              <p className="text-2xl font-medium">
                {formatPrice(props.product?.price)}
              </p>
            )}
          </div>
          {props.product.stock === 0 && (
            <Badge className="rounded-xl">Épuisé</Badge>
          )}
        </div>
        <p
          dangerouslySetInnerHTML={{ __html: props.product.description }}
          className="py-4"
        ></p>
        {props.product.perfumes && props.product.perfumes?.length > 0 && (
          <SetPerfume
            perfumes={props.product.perfumes}
            handlePerfumeSelect={handlePerfumeSelect}
          />
        )}
        <SetQuantity
          product={props.product}
          setQuantity={setQuantity}
          quantity={quantity}
        />
        <div className="mt-10 flex max-sm:flex-col gap-3">
          <Button
            size={"lg"}
            className="lg:w-full"
            onClick={handleAddToCart}
            disabled={props.product.stock === 0}
          >
            {props.product.stock === 0 ? (
              "Rupture de stock"
            ) : (
              <>
                <ShoppingCart className="mr-2 size-4" />
                Ajouter au panier
              </>
            )}
          </Button>
          <Button
            variant={"outline"}
            size={"lg"}
            className="lg:w-full"
            onClick={() => {
              if (isInFavorite) {
                removeFromFavorite(props.product);
              } else {
                addToFavorite(props.product);
              }
            }}
          >
            {isInFavorite ? (
              <>
                <HeartOff className="mr-2 size-4" />
                <span>Supprimer des favoris</span>
              </>
            ) : (
              <>
                <Heart className="mr-2 size-4" />
                <span>Ajouter au favoris</span>
              </>
            )}
          </Button>
        </div>
        {/* <Accordion type="single" collapsible className="mt-8 w-full">
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Heart className="size-4" />
                Allergènes
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <FileText className="size-4" />
                Mode d'emploi
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion> */}
      </div>
    </div>
  );
};
