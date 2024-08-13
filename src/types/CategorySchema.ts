import * as z from "zod";

export const CategorySchema = z.object({
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
  image: z.string({
    message: "Champ obligatoire",
  }),
  description: z
    .string({
      message: "Champ obligatoire",
    })
    .trim()
    .min(1, {
      message: "La description doit contenir au moins un caractère",
    })
    .max(255, {
      message: "La description doit contenir au maximum 255 caractères",
    }),
});

export type CategoryType = z.infer<typeof CategorySchema>;
