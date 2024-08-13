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
import { cn } from "@/lib/utils";
import { SettingsSchema } from "@/types/SettingsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Calendar } from "../../../src/components/ui/calendar";
import { PhoneInput } from "../../../src/components/ui/phone-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../src/components/ui/popover";
import { settingsAction } from "./settings.action";

type SettingsFormProps = {
  user: Session["user"];
};

export const SettingsForm = ({ user }: SettingsFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      email: user.email || "",
      birthday: user.birthday ? new Date(user.birthday) : undefined,
      phone: user.phone || "",
    },
    mode: "onChange",
  });

  const { isDirty } = form.formState;

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof SettingsSchema>) => {
      const { serverError, data } = await settingsAction(values);

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }

      toast.success("Profil mis a jour");
      form.reset(values);
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
        <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-14">
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
                  <Input disabled={mutation.isPending} {...field} />
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
                  <Input {...field} disabled={mutation.isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-y-6 gap-x-14 md:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>
                  E-mail
                  <span className="ml-1 text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={user.isOAuth || mutation.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date de naissance</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: fr })
                        ) : (
                          <span>Choisissez une date</span>
                        )}
                        <CalendarIcon className="ml-auto size-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      captionLayout="dropdown-buttons"
                      fromYear={1950}
                      toYear={new Date().getFullYear()}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-x-14 md:grid-cols-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Numéro de téléphone</FormLabel>
                <FormControl>
                  <PhoneInput
                    value={field.value}
                    onChange={field.onChange}
                    defaultCountry="FR"
                    disabled={mutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end">
          <Button type="submit" disabled={!isDirty || mutation.isPending}>
            Enregistrer les modifications
            {mutation.isPending && <Loader className="size-4 ml-2" />}
          </Button>
        </div>
      </form>
    </Form>
  );
};
