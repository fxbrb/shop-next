import * as z from "zod";

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Champ e-mail obligatoire.",
    })
    .email("l'Email est invalide"),
});

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(8, "Le mot de passe doit comporter minimum 8 caractères")
      .regex(
        /[a-z]/,
        "Le mot de passe doit contenir au moins une lettre minuscule"
      )
      .regex(
        /[A-Z]/,
        "Le mot de passe doit contenir au moins une lettre majuscule"
      )
      .regex(/\d/, "Le mot de passe doit contenir au moins un chiffre"),

    confirmPassword: z
      .string()
      .trim()
      .min(8, "Le mot de passe doit comporter minimum 8 caractères")
      .regex(
        /[a-z]/,
        "Le mot de passe doit contenir au moins une lettre minuscule"
      )
      .regex(
        /[A-Z]/,
        "Le mot de passe doit contenir au moins une lettre majuscule"
      )
      .regex(/\d/, "Le mot de passe doit contenir au moins un chiffre"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export const PasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(8, "Le mot de passe doit comporter minimum 8 caractères")
      .regex(
        /[a-z]/,
        "Le mot de passe doit contenir au moins une lettre minuscule"
      )
      .regex(
        /[A-Z]/,
        "Le mot de passe doit contenir au moins une lettre majuscule"
      )
      .regex(/\d/, "Le mot de passe doit contenir au moins un chiffre"),

    newPassword: z
      .string()
      .trim()
      .min(8, "Le mot de passe doit comporter minimum 8 caractères")
      .regex(
        /[a-z]/,
        "Le mot de passe doit contenir au moins une lettre minuscule"
      )
      .regex(
        /[A-Z]/,
        "Le mot de passe doit contenir au moins une lettre majuscule"
      )
      .regex(/\d/, "Le mot de passe doit contenir au moins un chiffre"),

    confirmPassword: z
      .string()
      .trim()
      .min(8, "Le mot de passe doit comporter minimum 8 caractères")
      .regex(
        /[a-z]/,
        "Le mot de passe doit contenir au moins une lettre minuscule"
      )
      .regex(
        /[A-Z]/,
        "Le mot de passe doit contenir au moins une lettre majuscule"
      )
      .regex(/\d/, "Le mot de passe doit contenir au moins un chiffre"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>;
export type NewPasswordType = z.infer<typeof NewPasswordSchema>;
