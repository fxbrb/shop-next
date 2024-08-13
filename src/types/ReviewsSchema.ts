import * as z from "zod";

export const ReviewSchema = z.object({
  id: z.string().optional(),
  rating: z
    .number()
    .min(1, { message: "Veuillez ajouter au moins une étoile" })
    .max(5, {
      message: "Veuillez ne pas ajouter plus de 5 étoiles",
    }),
  message: z.string().trim().min(1, {
    message: "Le commentaire est requis",
  }),
  createdAt: z.date().optional(),
});

export type ReviewType = z.infer<typeof ReviewSchema>;

export type ReviewWithUserType = ReviewType & {
  user: {
    id: string;
    firstname?: string | null;
    lastname?: string | null;
  };
};

export type ReviewWithUserAndProductType = ReviewType & {
  user: {
    id: string;
    firstname?: string | null;
    lastname?: string | null;
  };

  product: {
    id: string;
    name: string;
    slug: string;
    images: string[];
  };
};
