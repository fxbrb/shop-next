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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ReviewSchema } from "@/types/ReviewsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { addReviewAction } from "./review.action";

export type ReviewFormProps = {
  productId: string;
};

export const ReviewForm = (props: ReviewFormProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      rating: 0,
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof ReviewSchema>) => {
      const { serverError } = await addReviewAction({
        id: props.productId,
        data: values,
      });

      if (serverError) {
        toast.error(serverError);
        return;
      }

      toast.success("Commentaire ajouté avec succès");
      form.reset();
      setOpen(false);
      router.refresh();
    },
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="mt-4 w-full">
          Laisser un avis !
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96" align="end">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (values) => {
              await mutation.mutateAsync(values);
            })}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Laissez votre avis</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={mutation.isPending}
                      placeholder="Comment décririez-vous ce produit?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Laissez votre note</FormLabel>
                  <FormControl>
                    <Input
                      type="hidden"
                      disabled={mutation.isPending}
                      {...field}
                    />
                  </FormControl>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <motion.div
                        className="relative cursor-pointer"
                        whileTap={{ scale: 0.8 }}
                        whileHover={{ scale: 1.2 }}
                        key={value}
                      >
                        <Star
                          onClick={() => {
                            form.setValue("rating", value, {
                              shouldValidate: true,
                            });
                          }}
                          className={cn(
                            "text-[#f1c645] bg-transparent transition-all duration-300 ease-in-out",
                            form.getValues("rating") >= value
                              ? "fill-[#f1c645]"
                              : "fill-transparent"
                          )}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending && <Loader className="size-4 mr-2" />}
              Ajouter un commentaire
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};
