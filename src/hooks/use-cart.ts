import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  slug?: string;
  description: string;
  images: string[];
  perfume?: string;
  price: number;
  discount: number;
  quantity: number;
  stock: number;
};

export type CartStore = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  increaseQuantity: (item: CartItem) => void;
  decreaseQuantity: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  checkoutProgress: "cart-page" | "payment-page" | "confirmation-page";
  setCheckoutProgress: (
    val: "cart-page" | "payment-page" | "confirmation-page"
  ) => void;
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      clearCart: () => set({ cart: [] }),
      addToCart: (item) => {
        const existingItem = item.perfume
          ? get().cart.find((i) => i.perfume === item.perfume)
          : get().cart.find((i) => i.id === item.id);

        if (existingItem) {
          toast.error(
            `\[${item.name} ${
              item.perfume ? `(${item.perfume})` : ""
            }\] est déja dans le panier!`
          );
          return;
        } else {
          const totalQuantity = get().cart.reduce((acc, cartItem) => {
            if (cartItem.id === item.id) {
              return acc + cartItem.quantity;
            }
            return acc;
          }, 0);

          if (totalQuantity + item.quantity <= item.stock) {
            set((state) => ({
              cart: [...state.cart, { ...item, quantity: item.quantity }],
            }));
            toast.success(
              `\[${item.name} ${
                item.perfume ? `(${item.perfume})` : ""
              }\] ajouté au panier!`
            );
          } else {
            toast.error(
              `Vous ne pouvez pas ajouter plus que le stock disponible de \[${item.name}\]`
            );
          }
        }
      },

      // addToCart: (item) => {
      //   const existingItem = get().cart.find((i) => i.id === item.id);

      //   if (existingItem) {
      //     toast.error(`${item.title} est déjà dans le panier`);
      //   } else if (item.stock === 0) {
      //     toast.error(
      //       `${item.title} est épuisé et ne peut pas être ajouté au panier`
      //     );
      //   } else {
      //     set((state) => ({
      //       cart: [...state.cart, { ...item, quantity: item.quantity }],
      //     }));
      //     toast.success(`${item.title} ajouté au panier!`);
      //   }
      // },
      increaseQuantity: (item) => {
        let product;

        if (item.perfume) {
          product = get().cart.find((i) => i.perfume === item.perfume);
        } else {
          product = get().cart.find((i) => i.id === item.id);
        }

        if (product && item.quantity < product?.stock) {
          const totalQuantity = get().cart.reduce((acc, cartItem) => {
            if (cartItem.id === item.id) {
              return acc + cartItem.quantity;
            }
            return acc;
          }, 0);

          if (totalQuantity < item.stock) {
            set((state) => ({
              cart: state.cart.map((i) =>
                i.perfume === item.perfume ||
                (i.id === item.id && !item.perfume)
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            }));
          } else {
            toast.error(
              `Vous ne pouvez pas ajouter plus que le stock disponible de \[${item.name}\]`
            );
          }
        } else {
          toast.error(
            `Vous ne pouvez pas ajouter plus que le stock disponible de \[${item.name}\]`
          );
        }
      },

      decreaseQuantity: (item) => {
        let product;

        if (item.perfume) {
          product = get().cart.find((i) => i.perfume === item.perfume);
        } else {
          product = get().cart.find((i) => i.id === item.id);
        }

        if (product) {
          if (product.quantity > 1) {
            set((state) => ({
              cart: state.cart.map((i) =>
                i.perfume === item.perfume ||
                (i.id === item.id && !item.perfume)
                  ? { ...i, quantity: i.quantity - 1 }
                  : i
              ),
            }));
          } else {
            set((state) => ({
              cart: state.cart.filter(
                (i) =>
                  !(
                    i.perfume === item.perfume ||
                    (i.id === item.id && !item.perfume)
                  )
              ),
            }));
            toast.success(
              `\[${item.name} ${
                item.perfume ? `(${item.perfume})` : ""
              }\] supprimé du panier`
            );
          }
        }
      },
      // decreaseQuantity: (item) => {
      //   const existingItem = get().cart.find((i) => i.id === item.id);
      //   if (existingItem) {
      //     if (existingItem.quantity > 1) {
      //       set((state) => ({
      //         cart: state.cart.map((i) =>
      //           i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
      //         ),
      //       }));
      //     } else {
      //       set((state) => ({
      //         cart: state.cart.filter((i) => i.id !== item.id),
      //       }));
      //       toast.success(`${item.title} supprimé du panier`);
      //     }
      //   }
      // },
      removeFromCart: (item) => {
        set((state) => ({
          cart: item.perfume
            ? state.cart.filter((i) => i.perfume !== item.perfume)
            : state.cart.filter((i) => i.id !== item.id),
        }));
        toast.success(
          `\[${item.name} ${
            item.perfume ? `(${item.perfume})` : ""
          }\] supprimé du panier`
        );
      },
      checkoutProgress: "cart-page",
      setCheckoutProgress: (val) => set((state) => ({ checkoutProgress: val })),
    }),
    { name: "cart-storage" }
  )
);
