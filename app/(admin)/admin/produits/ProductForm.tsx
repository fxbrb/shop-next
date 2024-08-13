"use client";

import { PerfumeInput } from "@/components/admin-panel/products/PerfumeInput";
import { Button, buttonVariants } from "@/components/ui/button";

import { RemoveButton } from "@/components/admin-panel/RemoveButton";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tiptap } from "@/components/ui/tiptap";
import { cn } from "@/lib/utils";
import { ProductSchema, ProductType } from "@/types/ProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, UploadCloudIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  createProductAction,
  deleteProductAction,
  updateProductAction,
} from "./product.action";
import { deleteImageAction, uploadImagesAction } from "./upload.action";

type ProductFormProps = {
  defaultValues?: ProductType;
  categories: { id: string; name: string }[];
};

export const ProductForm = (props: ProductFormProps) => {
  const router = useRouter();
  const [formStep, setFormStep] = useState<number>(0);
  const form = useForm<ProductType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      ...props.defaultValues,
    } || {
      name: "",
      categoryId: "",
      description: "",
      images: [],
      perfumes: [],
      price: 0,
      stock: 0,
      discount: 0,
    },
    mode: "onChange",
  });

  console.log(form.getValues());

  const action = props.defaultValues ? "Sauvegarder" : "Créer";

  const removeImage = useMutation({
    mutationFn: async (index: number) => {
      const images = form.getValues("images");
      const url = images[index];

      const { serverError } = await deleteImageAction(url);

      if (serverError) {
        toast.error(serverError);
        return;
      }

      images.splice(index, 1);
      form.setValue("images", images);
    },
  });

  const submitImage = useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      const existingImages = form.getValues("images") || [];
      files.forEach((file) => {
        formData.append("file", file);
      });

      const { serverError, data } = await uploadImagesAction(formData);

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }

      const urls = [...existingImages, ...data.map((item: any) => item.url)];
      form.setValue("images", urls);
    },
  });

  const isCreate = !Boolean(props.defaultValues);

  const mutation = useMutation({
    mutationFn: async (values: ProductType) => {
      const { data, serverError } = isCreate
        ? await createProductAction(values)
        : await updateProductAction({
            id: props.defaultValues?.id ?? "",
            data: values,
          });

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }

      isCreate
        ? toast.success("Product created")
        : toast.success("Product updated");

      router.push("/admin/produits");
      router.refresh();
    },
  });

  return (
    <div>
      <div className="flex items-center justify-end py-6">
        <div className="flex items-center gap-2">
          {props.defaultValues && (
            <RemoveButton
              itemId={props.defaultValues.id ?? ""}
              redirectUrl="/admin/produits"
              itemType="product"
              onDeleteAction={deleteProductAction}
            />
          )}
          <Link
            href="/admin/produits"
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
          <div
            className={cn("space-y-3", {
              hidden: formStep !== 0,
            })}
          >
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
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
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Categorie
                      <span className="ml-1 text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selectionnez une categorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {props.categories.map((category) => (
                          <SelectItem value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

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

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="perfumes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parfums</FormLabel>
                    <FormControl>
                      <PerfumeInput
                        value={field.value ?? []}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Laissez vide si votre produit ne contient pas de parfum
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div
            className={cn("space-y-3", {
              hidden: formStep !== 1,
            })}
          >
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Prix
                    <span className="ml-1 text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Stock
                    <span className="ml-1 text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" min={0} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Réduction (en €)</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} {...field} />
                  </FormControl>
                  <FormDescription>
                    Mettre à 0 si pas de réduction
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div
            className={cn("space-y-3", {
              hidden: formStep !== 2,
            })}
          >
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <div className="space-y-6">
                  <FormItem className="w-full">
                    <FormControl>
                      <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Images
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
                                          Cliquez pour sélectionner les fichiers
                                        </p>
                                        <p className="text-sm text-muted-foreground/70">
                                          Vous pouvez télécharger 5 fichiers
                                          jusqu'à 1024*1024MB chacun
                                        </p>
                                      </div>
                                    </div>

                                    <input
                                      id="images"
                                      type="file"
                                      multiple
                                      className="hidden"
                                      disabled={
                                        removeImage.isPending ||
                                        submitImage.isPending
                                      }
                                      onChange={(e) => {
                                        const files = Array.from(
                                          e.target.files || []
                                        );

                                        if (files.length === 0) {
                                          return;
                                        }

                                        const validFiles = [];
                                        for (let i = 0; i < files.length; i++) {
                                          const file = files[i];
                                          // if (file.size > 1024 * 1024) {
                                          //   toast.error(
                                          //     "Le fichier est trop gros"
                                          //   );
                                          //   return;
                                          // }
                                          if (!file.type.includes("image")) {
                                            toast.error(
                                              "Le fichier n'est pas une image"
                                            );
                                            return;
                                          }
                                          validFiles.push(file);
                                        }

                                        if (validFiles.length > 5) {
                                          toast.error(
                                            "Vous pouvez télécharger 5 images maximum"
                                          );
                                          return;
                                        }

                                        if (validFiles.length > 0) {
                                          submitImage.mutate(validFiles);
                                        }
                                      }}
                                    />
                                  </label>
                                </div>
                              </FormControl>
                              {field.value ? (
                                <ScrollArea className="h-fit w-full px-3">
                                  <div className="max-h-48 space-y-4">
                                    {field.value.map((file, index) => (
                                      <div
                                        className="relative flex items-center space-x-4"
                                        key={file}
                                      >
                                        <div className="flex flex-1">
                                          <Image
                                            src={file}
                                            alt={file}
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
                                            onClick={() => {
                                              removeImage.mutate(index);
                                            }}
                                          >
                                            {removeImage.isPending ? (
                                              <Loader className="size-4" />
                                            ) : (
                                              <X className="size-4" />
                                            )}
                                          </Button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </ScrollArea>
                              ) : null}
                            </div>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
          </div>

          <div className="flex items-center gap-2 justify-end">
            {formStep > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormStep((prevStep) => prevStep - 1)}
                disabled={
                  submitImage.isPending ||
                  removeImage.isPending ||
                  mutation.isPending
                }
              >
                <ArrowLeft className="size-4 mr-2" />
                Précédent
              </Button>
            )}
            <Button
              type="submit"
              disabled={
                removeImage.isPending ||
                submitImage.isPending ||
                removeImage.isPending
              }
              className={cn({ hidden: formStep !== 2 })}
            >
              {action}
            </Button>

            <Button
              type="button"
              variant={"ghost"}
              className={cn({ hidden: formStep !== 0 })}
              onClick={() => {
                form.trigger(["name", "categoryId", "description"]);
                const nameState = form.getFieldState("name");
                const categoryState = form.getFieldState("categoryId");
                const descriptionState = form.getFieldState("description");

                if (
                  nameState.invalid ||
                  categoryState.invalid ||
                  descriptionState.invalid
                )
                  return;

                if (isCreate) {
                  if (
                    !nameState.isDirty ||
                    !categoryState.isDirty ||
                    !descriptionState.isDirty
                  )
                    return;
                }
                setFormStep((prevStep) => prevStep + 1);
              }}
            >
              Suivant <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              type="button"
              variant={"ghost"}
              className={cn({ hidden: formStep !== 1 })}
              onClick={() => {
                form.trigger(["price", "stock", "discount"]);
                const priceState = form.getFieldState("price");
                const stockState = form.getFieldState("stock");
                const discountState = form.getFieldState("discount");

                if (
                  priceState.invalid ||
                  stockState.invalid ||
                  discountState.invalid
                )
                  return;

                if (isCreate) {
                  if (
                    !priceState.isDirty ||
                    !stockState.isDirty ||
                    !discountState.isDirty
                  )
                    return;
                }

                setFormStep((prevStep) => prevStep + 1);
              }}
            >
              Suivant <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
