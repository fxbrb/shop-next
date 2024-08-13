"use client";

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
import { Loader } from "@/components/ui/loader";
import { ReviewWithUserType } from "@/types/ReviewsSchema";
import { useMutation } from "@tanstack/react-query";
import { formatDistance, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import { Trash2 } from "lucide-react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Stars } from "./Stars";
import { deleteReviewAction } from "./review.action";

export type ReviewProps = {
  reviews: ReviewWithUserType[];
  user: Session["user"];
};

export const Review = (props: ReviewProps) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (reviewId: string) => {
      const { serverError } = await deleteReviewAction(reviewId);

      if (serverError) {
        toast.error(serverError);
        return;
      }
      router.refresh();
    },
  });
  return (
    <>
      {props.reviews.length > 0 ? (
        <div className="divide-y border-t border-border">
          {props.reviews.map((review) => (
            <div
              className="relative py-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
              key={review.id}
            >
              {review.user.id === props.user.id && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-4 top-7"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Êtes-vous sûr de vouloir supprimer ?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Cette action ne peut pas être annulée. Cela supprimera
                        définitivement.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          mutation.mutate(review.id ?? "");
                        }}
                      >
                        {mutation.isPending && (
                          <Loader className="size-4 mr-2" />
                        )}
                        Supprimer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              <div className="flex flex-col space-y-2 lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:items-start">
                <p className="text-sm font-semibold">
                  {review.user.lastname + " " + review.user.firstname}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistance(subDays(review.createdAt!, 0), new Date(), {
                    addSuffix: true,
                    locale: fr,
                  })}
                </p>
              </div>

              <div className="max-lg:mt-6 lg:col-span-8 lg:col-start-5">
                <Stars
                  rating={review.rating}
                  reviewCount={review.rating}
                  size={16}
                />
                <div className="max-lg:mt-4 lg:mt-6">
                  <p className="text-sm italic text-muted-foreground">
                    {review.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full">
          <p className="text-sm font-bold text-muted-foreground">
            Pas encore d'avis
          </p>
        </div>
      )}
    </>
  );
};
