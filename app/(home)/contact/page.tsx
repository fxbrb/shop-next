import { Section } from "@/components/Section";
import { ContactForm } from "./ContactForm";

export default function ContactPage() {
  return (
    <Section className="grid grid-cols-1 gap-5 py-16 md:py-24 lg:grid-cols-2 max-w-screen-xl">
      <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
        <h2 className="text-3xl font-bold tracking-tight">
          Laissez-nous savoir comment nous pouvons vous aider
        </h2>
        <p className="mt-6 text-base leading-8 text-muted-foreground">
          Nous sommes là pour vous aider et répondre à toutes vos questions.
          Veuillez remplir le formulaire, puis nous vous contacterons dans les
          plus brefs délais pour vous apporter toute l'assistance nécessaire.
        </p>
      </div>

      <ContactForm />
    </Section>
  );
}
