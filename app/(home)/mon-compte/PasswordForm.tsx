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
import { PasswordSchema } from "@/types/PasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { changePasswordAction } from "./settings.action";

export const PasswordForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const { isDirty } = form.formState;

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof PasswordSchema>) => {
      const { serverError, data } = await changePasswordAction(values);

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }

      toast.success("Mot de passe mis a jour");
      form.reset();
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
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe actuel</FormLabel>
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
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nouveau mot de passe</FormLabel>
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
                <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
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
        </div>

        <div className="flex items-center justify-end">
          <Button type="submit" disabled={!isDirty || mutation.isPending}>
            {mutation.isPending && <Loader className="mr-2 size-4" />}
            Enregistrer
          </Button>
        </div>
      </form>
    </Form>
  );
};
