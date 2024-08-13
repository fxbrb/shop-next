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
import {
  ForgotPasswordSchema,
  ForgotPasswordType,
} from "@/types/PasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { forgotPasswordAction } from "./forgot-password.action";

export const ForgotPasswordForm = () => {
  const router = useRouter();
  const form = useForm<ForgotPasswordType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: ForgotPasswordType) => {
      const { serverError } = await forgotPasswordAction(values);

      if (serverError) {
        toast.error(serverError);
        return;
      }

      toast.success("Email de réinitialisation envoyé!");
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="m@example.com"
                  {...field}
                  disabled={mutation.isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending && <Loader className="size-4 mr-2" />}
          Envoyer un e-mail de réinitialisation
        </Button>
      </form>
    </Form>
  );
};
