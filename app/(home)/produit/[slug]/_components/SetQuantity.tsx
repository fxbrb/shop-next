import { Label } from "@/components/ui/label";
import { ProductType } from "@/types/ProductSchema";
import { Minus, Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export type SetQuantityProps = {
  isCartPage?: boolean;
  product: ProductType;
  setQuantity: Dispatch<SetStateAction<number>>;
  quantity: number;
};

export const SetQuantity = (props: SetQuantityProps) => {
  return (
    <div className="mt-3 space-y-2">
      {props.isCartPage ? null : <Label>Quantité</Label>}

      <div className="mt-2 flex w-fit items-center rounded-md border border-border shadow-sm">
        <button
          type="button"
          className="flex size-9 items-center justify-center text-muted-foreground transition hover:opacity-75"
          disabled={props.product.stock === 0}
          onClick={() => {
            if (props.quantity > 1) {
              props.setQuantity(props.quantity - 1);
            }
          }}
        >
          <Minus size={12} strokeWidth={3} />
        </button>

        <input
          type="number"
          readOnly
          value={props.quantity}
          className="h-9 w-16 select-none border-transparent text-center font-semibold focus-visible:outline-none sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
        />

        <button
          type="button"
          className="flex size-9 items-center justify-center text-muted-foreground transition hover:opacity-75"
          disabled={props.product.stock === 0}
          onClick={() => {
            if (props.quantity === 99) {
              return;
            }
            props.setQuantity(props.quantity + 1);
          }}
        >
          <Plus size={12} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};
