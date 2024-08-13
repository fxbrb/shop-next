import { auth } from "@/auth";
import { createSafeActionClient } from "next-safe-action";

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ActionError";
  }
}

const handleReturnedServerError = (error: Error) => {
  if (error instanceof ActionError) {
    return error.message;
  }

  return "An unexpected error occured";
};

export const action = createSafeActionClient({
  handleReturnedServerError: handleReturnedServerError,
});

export const authenticatedAction = createSafeActionClient({
  handleReturnedServerError: handleReturnedServerError,
  middleware: async () => {
    const session = await auth();

    if (!session?.user.id) {
      throw new ActionError("Vous devez être connecter");
    }

    return session;
  },
});
