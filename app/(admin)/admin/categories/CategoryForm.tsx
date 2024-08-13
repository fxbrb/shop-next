"use client";

import { RemoveButton } from "@/components/admin-panel/RemoveButton";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { Tiptap } from "@/components/ui/tiptap";
import { cn } from "@/lib/utils";
import { CategorySchema, CategoryType } from "@/types/CategorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { UploadCloudIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  createCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
} from "./category.action";
import { deleteImageAction, uploadImageAction } from "./upload.action";

type CategoryFormProps = {
  defaultValues?: CategoryType;
};

export const CategoryForm = (props: CategoryFormProps) => {
  const router = useRouter();
  const action = props.defaultValues ? "Sauvegarder" : "Créer";
  const form = useForm<CategoryType>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      ...props.defaultValues,
    } || {
      name: "",
      description: "",
      images: "",
    },
    mode: "onChange",
  });
  const isCreate = !Boolean(props.defaultValues);

  const mutation = useMutation({
    mutationFn: async (values: CategoryType) => {
      const { data, serverError } = isCreate
        ? await createCategoryAction(values)
        : await updateCategoryAction({
            id: props.defaultValues?.id ?? "",
            data: values,
          });

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }

      isCreate
        ? toast.success("Categorie crée avec succès")
        : toast.success("Categorie mit a jour avec succès");
      router.push("/admin/categories");
      router.refresh();
    },
  });

  const submitImage = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.set("file", file);

      const { data, serverError } = await uploadImageAction(formData);

      if (!data || serverError) {
        toast.error(serverError);
        return;
      }

      const url = data.url;

      form.setValue("image", url);
    },
  });

  const removeImage = useMutation({
    mutationFn: async () => {
      const image = form.getValues("image");
      const urlToDelete = image;

      const { serverError } = await deleteImageAction(urlToDelete);

      if (serverError) {
        toast.error(serverError);
        return;
      }

      form.setValue("image", "");
    },
  });

  return (
    <div>
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-2">
          {props.defaultValues && (
            <RemoveButton
              itemId={props.defaultValues.id ?? ""}
              redirectUrl="/admin/categories"
              itemType="category"
              onDeleteAction={deleteCategoryAction}
            />
          )}
          <Link
            href="/admin/categories"
            className={buttonVariants({
              size: "sm",
              variant: "outline",
            })}
          >
            Annuler
          </Link>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (values) => {
            await mutation.mutateAsync(values);
          })}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nom
                    <span className="ml-1 text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description
                  <span className="ml-1 text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Tiptap val={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Image
                  <span className="ml-1 text-red-500">*</span>
                </FormLabel>

                <div className="flex flex-col space-y-5">
                  <FormControl>
                    <div className="flex w-full items-center justify-center">
                      <label
                        htmlFor="images"
                        className={cn(
                          "group relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                          removeImage.isPending &&
                            "pointer-events-none opacity-60",
                          submitImage.isPending &&
                            "pointer-events-none opacity-60"
                        )}
                      >
                        <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                          <div className="rounded-full border border-dashed p-3">
                            <UploadCloudIcon
                              className="size-7 text-muted-foreground"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="space-y-px">
                            <p className="font-medium text-muted-foreground">
                              Cliquez pour sélectionner un fichier
                            </p>
                            <p className="text-sm text-muted-foreground/70">
                              Vous pouvez télécharger 1 image jusqu'à
                              1024*1024MB
                            </p>
                          </div>
                        </div>

                        <input
                          id="images"
                          type="file"
                          className="hidden"
                          disabled={
                            removeImage.isPending || submitImage.isPending
                          }
                          onChange={(e) => {
                            const file = e.target.files?.[0];

                            if (!file) {
                              return;
                            }

                            if (file.size > 1024 * 1024) {
                              toast.error("File is too big");
                              return;
                            }
                            if (!file.type.includes("image")) {
                              toast.error("File is not an image");
                              return;
                            }

                            submitImage.mutate(file);
                          }}
                        />
                      </label>
                    </div>
                  </FormControl>
                  {field.value ? (
                    <div className="max-h-48 space-y-4">
                      <div className="relative flex items-center space-x-4">
                        <div className="flex flex-1">
                          <Image
                            src={field.value}
                            alt={field.value}
                            width={48}
                            height={48}
                            loading="lazy"
                            className="aspect-square shrink-0 rounded-md object-cover bg-gray-300"
                          />
                        </div>
                        <div className="flex items-center">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="size-7"
                            onClick={() => removeImage.mutate()}
                          >
                            {removeImage.isPending ? (
                              <Loader className="size-4" />
                            ) : (
                              <X className="size-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end">
            <Button
              className="ml-auto"
              type="submit"
              disabled={submitImage.isPending || mutation.isPending}
            >
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
