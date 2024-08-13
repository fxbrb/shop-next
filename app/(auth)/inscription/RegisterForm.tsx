"use client";

import { Button } from "@/components/ui/button";
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
import { PasswordInput } from "@/components/ui/password-input";
import { RegisterSchema } from "@/types/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { registerAction } from "./register.action";

export const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof RegisterSchema>) => {
      const { serverError, data } = await registerAction(values);

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }

      router.push("/connexion");
      toast.success("Inscription réussie avec succès !");
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => {
          await mutation.mutateAsync(values);
        })}
        className="my-4 space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nom
                  <span className="ml-1 text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={mutation.isPending}
                    placeholder="Doe"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Prénom
                  <span className="ml-1 text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={mutation.isPending}
                    placeholder="John"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email
                <span className="ml-1 text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={mutation.isPending}
                  placeholder="m@example.com"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">
                Mot de passe
                <span className="ml-1 text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <PasswordInput
                  value={field.value}
                  disabled={mutation.isPending}
                  onChange={field.onChange}
                  placeholder="********"
                />
              </FormControl>
              <FormDescription>
                Le mot de passe doit comporter au minimum 8 caractères, contenir
                au moins une lettre minuscule, une lettre majuscule et un
                chiffre.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          Créer un compte
          {mutation.isPending && <Loader className="size-4 ml-2" />}
        </Button>
      </form>
    </Form>
  );
};
