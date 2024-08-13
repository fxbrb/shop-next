"use server";

import Contact from "@/emails/Contact";
import { ActionError, action } from "@/lib/safe-actions";
import { ContactSchema } from "@/types/ContactSchema";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailAction = action(ContactSchema, async (values) => {
  const { email, message, firstname, lastname } = values;

  if (!firstname || !lastname || !email || !message) {
    throw new ActionError("All fields are required");
  }

  const send = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "f.barbier96@gmail.com",
    subject: "Contact - Maria Rosaria",
    reply_to: email,
    react: Contact({
      firstname: firstname,
      lastname: lastname,
      email: email,
      message: message,
    }),
  });

  return send;
});
