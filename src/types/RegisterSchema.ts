import * as z from "zod";

export const RegisterSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Champ e-mail obligatoire.",
    })
    .email("l'Email est invalide"),
  password: z
    .string()
    .trim()
    .min(8, "Le mot de passe doit comporter au minimum 8 caractères")
    .regex(
      /[a-z]/,
      "Le mot de passe doit contenir au moins une lettre minuscule"
    )
    .regex(
      /[A-Z]/,
      "Le mot de passe doit contenir au moins une lettre majuscule"
    )
    .regex(/\d/, "Le mot de passe doit contenir au moins un chiffre"),
  firstname: z.string().trim().min(1, {
    message: "Champ prénom requis",
  }),
  lastname: z.string().trim().min(1, {
    message: "Champ nom requis",
  }),
});
