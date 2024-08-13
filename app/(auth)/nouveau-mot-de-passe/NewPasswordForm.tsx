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
import { Loader } from "@/components/ui/loader";
import { PasswordInput } from "@/components/ui/password-input";
import { NewPasswordSchema, NewPasswordType } from "@/types/PasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { newPasswordAction } from "./new-password.action";

export const NewPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const form = useForm<NewPasswordType>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: NewPasswordType) => {
      const { serverError } = await newPasswordAction({
        token: token,
        data: values,
      });

      if (serverError) {
        toast.error(serverError);
        return;
      }

      toast.success("Mot de passe mit a jour!");
      form.reset();
      router.push("/connexion");
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => {
          await mutation.mutateAsync(values);
        })}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <PasswordInput
                  value={field.value}
                  onChange={field.onChange}
                  disabled={mutation.isPending}
                  placeholder="********"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmez votre mot de passe</FormLabel>
              <FormControl>
                <PasswordInput
                  value={field.value}
                  onChange={field.onChange}
                  disabled={mutation.isPending}
                  placeholder="********"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending && <Loader className="size-4 mr-2" />}
          Changer le mot de passe
        </Button>
      </form>
    </Form>
  );
};
