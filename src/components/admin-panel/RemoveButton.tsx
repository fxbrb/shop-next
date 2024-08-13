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
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export type RemoveButtonProps = {
  itemId: string;
  itemType: "product" | "category";
  redirectUrl?: string;
  onDeleteAction: (id: string) => Promise<{ serverError?: string }>;
};

export const RemoveButton = ({
  itemId,
  itemType,
  redirectUrl,
  onDeleteAction,
}: RemoveButtonProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (itemId: string) => {
      const { serverError } = await onDeleteAction(itemId);

      if (serverError) {
        toast.error(serverError);
        return;
      }

      if (redirectUrl) {
        router.push(redirectUrl);
      }

      setOpen(false);
      router.refresh();
      toast.success(
        `${itemType === "product" ? "Produit" : "Catégorie"} supprimé(e)`
      );
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
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
            définitivement{" "}
            {itemType === "product" ? "le produit" : "la catégorie"}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            disabled={mutation.isPending}
            onClick={(e) => {
              e.preventDefault();
              mutation.mutate(itemId);
            }}
          >
            {mutation.isPending ? <Loader className="size-4" /> : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
