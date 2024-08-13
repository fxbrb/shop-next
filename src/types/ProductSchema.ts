import * as z from "zod";

export const ProductSchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  name: z
    .string({
      message: "Champ obligatoire",
    })
    .trim()
    .min(1, {
      message: "Le nom doit contenir au moins un caractère",
    }),
  categoryId: z.string({
    message: "Champ obligatoire",
  }),
  images: z
    .array(z.string())
    .min(1, {
      message: "Vous devez ajouter au moins une image",
    })
    .max(5, {
      message: "Vous pouvez ajouter au maximum 5 images",
    }),
  perfumes: z.array(z.string()).optional(),
  price: z.coerce.number({ message: "Champ obligatoire" }).min(1, {
    message: "Le prix doit être minimum à 1",
  }),
  discount: z.coerce.number({ message: "Champ obligatoire" }).min(0),
  stock: z.coerce.number({ message: "Champ obligatoire" }).min(0),
  description: z
    .string({
      message: "Champ obligatoire",
    })
    .trim()
    .min(1, {
      message: "La description doit contenir au moins un caractère",
    }),
});

export type ProductType = z.infer<typeof ProductSchema>;
