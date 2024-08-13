"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import { Textarea } from "@/components/ui/textarea";
import { ContactSchema } from "@/types/ContactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SendHorizontal } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { sendEmailAction } from "./contact.action";

export const ContactForm = () => {
  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      firstname: undefined,
      lastname: undefined,
      email: undefined,
      message: undefined,
      validation: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof ContactSchema>) => {
      const { data, serverError } = await sendEmailAction(values);

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }

      form.reset();
      toast.success(
        "Votre message a été envoyé avec succès ! Nous vous répondrons dès que possible."
      );
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => {
          await mutation.mutateAsync(values);
        })}
      >
        <div className="mx-auto max-w-xl lg:mr-0">
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input disabled={mutation.isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input disabled={mutation.isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="sm:col-span-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled={mutation.isPending} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="sm:col-span-2">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="h-full min-h-28 resize-none"
                        disabled={mutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="validation"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-start space-x-3 space-y-0 py-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <FormDescription className="text-black dark:text-white">
                    En envoyant un message, j'accepte les{" "}
                    <Link
                      href="/conditions-generales"
                      target="_blank"
                      className="underline underline-offset-2 font-bold text-primary"
                    >
                      Conditions générales
                    </Link>{" "}
                    et la{" "}
                    <Link
                      href="/conditions-generales"
                      target="_blank"
                      className="underline underline-offset-2 font-bold text-primary"
                    >
                      Politique de confidentialité
                    </Link>{" "}
                    , et j'autorise Maria Rosaria à traiter mes données afin de
                    répondre à mon message.
                  </FormDescription>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-8 flex justify-end">
            <Button
              type="submit"
              size={"lg"}
              variant="expandIcon"
              className="group"
              Icon={SendHorizontal}
              iconPlacement="right"
              disabled={mutation.isPending}
            >
              {mutation.isPending && <Loader className="size-4 mr-2" />}
              Envoyer
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
