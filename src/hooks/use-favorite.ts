import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FavoriteItem = {
  id?: string;
  name: string;
  slug?: string;
  categoryId: string;
  description: string;
  images: string[];
  perfume?: string;
  price: number;
  discount: number;
  stock: number;
};

export type FavoriteStore = {
  favorite: FavoriteItem[];
  addToFavorite: (item: FavoriteItem) => void;
  removeFromFavorite: (item: FavoriteItem) => void;
  clearFavorite: () => void;
};

export const useFavorite = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorite: [],
      clearFavorite: () => set({ favorite: [] }),
      addToFavorite: (item) => {
        const existingItem = get().favorite.find((i) => i.id === item.id);
        if (existingItem) {
          toast.error(`${item.name} est déjà dans vos favoris`);
        } else {
          set((state) => ({
            favorite: [...state.favorite, { ...item }],
          }));
          toast.success(`${item.name} ajouté au favoris!`);
        }
      },

      removeFromFavorite: (item) => {
        set((state) => ({
          favorite: state.favorite.filter((i) => i.id !== item.id),
        }));
        toast.success(`${item.name} supprimé des favoris`);
      },
    }),
    { name: "favorite-storage" }
  )
);
