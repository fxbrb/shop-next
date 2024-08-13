"use client";

import { EmptyState } from "@/components/admin-panel/EmptyState";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddressSchema, AddressType } from "@/types/AddressSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Pencil, Plus } from "lucide-react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
  addAddressAction,
  deleteAddressAction,
  updateAddressAction,
} from "./settings.action";

export type AddressFormType = {
  addresses: AddressType[];
  user: Session["user"];
};

export const AddressForm = (props: AddressFormType) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [editingAddress, setEditingAddress] = useState<AddressType | null>(
    null
  );
  const form = useForm<z.infer<typeof AddressSchema>>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      firstname: props.user.firstname,
      lastname: props.user.lastname,
      address_line1: "",
      address_line2: "",
      city: "",
      postalCode: "",
      country: "France",
      isDefault: false,
      phone: "",
    },
    mode: "onChange",
  });

  const { isDirty } = form.formState;

  useEffect(() => {
    if (open === false) {
      setEditingAddress(null);
      form.reset({
        firstname: props.user.firstname,
        lastname: props.user.lastname,
        address_line1: "",
        address_line2: "",
        city: "",
        postalCode: "",
        country: "France",
        isDefault: false,
        phone: "",
      });
    }
  }, [open]);

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof AddressSchema>) => {
      const { serverError, data } = editingAddress
        ? await updateAddressAction({
            id: editingAddress.id ?? "",
            data: values,
          })
        : await addAddressAction(values);

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }

      setOpen(false);
      toast.success(editingAddress ? "Adresse modifiée!" : "Adresse ajoutée!");
      form.reset();
      setEditingAddress(null);
    },
  });

  const deleteAddress = useMutation({
    mutationFn: async (addressId: string) => {
      const { serverError } = await deleteAddressAction(addressId);

      if (serverError) {
        toast.error(serverError);
        return;
      }
      setOpen(false);
      toast.success("Adresse supprimée!");
    },
  });

  useEffect(() => {
    if (props.addresses.length === 0) {
      form.setValue("isDefault", true);
    }
  }, [props.addresses.length]);

  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center space-y-0">
        <CardTitle>Adresses</CardTitle>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button disabled={mutation.isPending}>
              <Plus className="size-4" />
              Ajouter
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl overflow-y-scroll max-h-screen">
            <DialogHeader>
              <DialogTitle>
                {editingAddress ? "Modifier l'adresse" : "Ajouter une adresse"}
              </DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(async (values) => {
                  await mutation.mutateAsync(values);
                })}
                className="space-y-3"
              >
                {!editingAddress?.isDefault && (
                  <FormField
                    control={form.control}
                    name="isDefault"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-row items-center space-x-3 space-y-0 py-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>

                          <FormLabel>Ceci est mon adresse par défaut</FormLabel>
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pays/région</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="France">France</SelectItem>
                          <SelectItem value="Belgique">Belgique</SelectItem>
                          <SelectItem value="Suisse">Suisse</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-6">
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
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={mutation.isPending} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address_line1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Adresse
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
                  name="address_line2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Appartement, suite, etc. (facultatif)
                      </FormLabel>
                      <FormControl>
                        <Input {...field} disabled={mutation.isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-6">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ville</FormLabel>
                        <FormControl>
                          <Input disabled={mutation.isPending} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code postal</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={mutation.isPending} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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

                <DialogFooter className="pt-6">
                  <div className="w-full flex items-center justify-between gap-2">
                    {editingAddress && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            type="button"
                            variant={"link"}
                            className="text-destructive"
                            disabled={
                              mutation.isPending || deleteAddress.isPending
                            }
                          >
                            Supprimer
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Supprimer l'adresse ?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Les commandes déjà passées ne seront pas
                              affectées.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              disabled={
                                mutation.isPending || deleteAddress.isPending
                              }
                            >
                              Retour
                            </AlertDialogCancel>
                            <AlertDialogAction
                              disabled={
                                mutation.isPending || deleteAddress.isPending
                              }
                              onClick={async () => {
                                await deleteAddress.mutate(
                                  editingAddress.id ?? ""
                                );
                              }}
                            >
                              {deleteAddress.isPending && (
                                <Loader className="size-4 mr-2" />
                              )}
                              Supprimer l'adresse
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                    <div className="flex items-center gap-2 justify-end w-full">
                      <Button
                        type="button"
                        onClick={() => setOpen(false)}
                        variant={"outline"}
                        disabled={mutation.isPending}
                      >
                        Annuler
                      </Button>
                      <Button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending && (
                          <Loader className="size-4 mr-2" />
                        )}
                        Enregistrer
                      </Button>
                    </div>
                  </div>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {props.addresses.length === 0 && (
          <EmptyState
            title="Aucune adresse!"
            description="Il semble que vous n'avez pas encore ajouté d'adresse. Ajoutez une nouvelle adresse pour faciliter vos commandes et livraisons."
          />
        )}
        {props.addresses.length > 0 && (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {props.addresses.map((address, index) => (
              <Card
                key={address.id}
                className="border-none shadow-none hover:bg-muted cursor-pointer"
                onClick={() => {
                  setEditingAddress(address);
                  form.reset(address);
                  setOpen(true);
                }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {address.firstname + " " + address.lastname}
                    </CardTitle>

                    <Pencil className="size-4" />
                  </div>
                  {address.isDefault && (
                    <p className="text-sm text-muted-foreground">
                      Adresse par défaut
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <address>
                    <p>{address.address_line1}</p>
                    <p>{address.postalCode + " " + address.city}</p>
                    <p>{address.country}</p>
                  </address>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
