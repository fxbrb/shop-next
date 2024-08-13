import { Bell } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { buttonVariants } from "../ui/button";

export type EmptyStateProps = {
  title: string;
  description?: string;
  redirectUrl?: string;
  textBtn?: string;
};

export const EmptyState = (props: EmptyStateProps) => {
  return (
    <Alert>
      <Bell size={20} />

      <div className="flex items-center justify-between gap-10">
        <div className="flex flex-col gap-1.5">
          <AlertTitle>{props.title}</AlertTitle>
          {props.description && (
            <AlertDescription>{props.description}</AlertDescription>
          )}
        </div>
        {props.redirectUrl && (
          <Link href={props.redirectUrl} className={buttonVariants()}>
            {props.textBtn}
          </Link>
        )}
      </div>
    </Alert>
  );
};
