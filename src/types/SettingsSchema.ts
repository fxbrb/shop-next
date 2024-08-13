import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import * as z from "zod";

export const SettingsSchema = z.object({
  firstname: z.string().trim().min(1, {
    message: "Champ prénom requis",
  }),
  lastname: z.string().trim().min(1, {
    message: "Champ nom requis",
  }),
  email: z
    .string()
    .min(1, {
      message: "Champ email requis",
    })
    .email("l'Email est invalide"),
  birthday: z.date().optional(),
  phone: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        try {
          return isValidPhoneNumber(value);
        } catch {
          return false;
        }
      },
      {
        message: "Numéro de téléphone invalide",
      }
    )
    .transform((value) => {
      if (!value) return value;
      const phoneNumber = parsePhoneNumber(value);
      return phoneNumber.format("E.164");
    }),
});

export type SettingsType = z.infer<typeof SettingsSchema>;
