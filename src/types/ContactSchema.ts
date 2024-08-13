import * as z from "zod";

export const ContactSchema = z.object({
  firstname: z
    .string({
      message: "Champ obligatoire",
    })
    .trim()
    .min(1, {
      message: "Le prénom doit contenir au moins un caractère",
    }),
  lastname: z
    .string({
      message: "Champ obligatoire",
    })
    .trim()
    .min(1, {
      message: "Le nom doit contenir au moins un caractère",
    }),
  email: z
    .string({
      message: "Champ obligatoire",
    })
    .min(1, {
      message: "L'email doit contenir au moins un caractère",
    })
    .email("Email invalide"),
  message: z
    .string({
      message: "Champ obligatoire",
    })
    .trim()
    .min(1, {
      message: "Le message doit contenir au moins un caractère",
    }),
  validation: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "Vous devez accepter les conditions pour envoyer le message",
    }),
});
