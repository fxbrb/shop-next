import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import * as z from "zod";

export const AddressSchema = z.object({
  id: z.string().optional(),
  firstname: z.string().trim().min(1, "Le prénom est requis."),
  lastname: z.string().trim().min(1, "Le nom est requis."),
  address_line1: z.string().trim().min(1, "Address line 1 is required"),
  address_line2: z.string().optional(),
  city: z.string().trim().min(1, "City is required"),
  postalCode: z.string().trim().min(1, "Postal code is required"),
  country: z.string().trim().min(1, "Country is required"),
  isDefault: z.boolean(),
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

export type AddressType = z.infer<typeof AddressSchema>;
