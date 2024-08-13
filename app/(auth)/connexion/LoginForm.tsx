"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import { PasswordInput } from "@/components/ui/password-input";
import { LoginSchema } from "@/types/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { loginAction } from "./login.action";

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "E-mail déjà utilisé avec un autre système de connexion"
      : "";
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (urlError) {
      toast.error(urlError);
    }
  }, [urlError]);

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof LoginSchema>) => {
      const { serverError } = await loginAction(values);

      if (serverError) {
        toast.error(serverError);
        return;
      }

      router.push("/");
      router.refresh();
      toast.success("Connecté avec succès");
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
                  placeholder="m@example.com"
                  disabled={mutation.isPending}
                  {...field}
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
            <div className="flex flex-col gap-3">
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

                <FormMessage />
              </FormItem>
              <Link
                href="/mot-de-passe-oublie"
                className="w-fit text-sm font-medium text-black dark:text-white underline-offset-2 hover:underline"
              >
                Mot de passe oublié?
              </Link>
            </div>
          )}
        />
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending && <Loader className="size-4 mr-2" />}
          Connexion
        </Button>
      </form>
    </Form>
  );
};
