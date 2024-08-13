import { auth } from "@/auth";
import { ReviewWithUserType } from "@/types/ReviewsSchema";
import { Review } from "./Review";
import { ReviewForm } from "./ReviewForm";

type ReviewsProps = {
  productId: string;
  reviews: ReviewWithUserType[];
};

export const Reviews = async (props: ReviewsProps) => {
  const session = await auth();

  return (
    <div className="flex flex-col items-start gap-8">
      <div className="mt-10 max-w-lg w-full">
        <h3 className="text-2xl font-semibold tracking-tight">
          Partage ton avis
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Si vous avez utilisé ce produit, partagez vos impressions avec
          d'autres clients
        </p>

        <ReviewForm productId={props.productId} />
      </div>
      <div className="w-full max-lg:mt-16">
        <Review reviews={props.reviews} user={session?.user ?? ""} />
      </div>
    </div>
  );
};
