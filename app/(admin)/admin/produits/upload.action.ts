"use server";

import { ActionError, authenticatedAction } from "@/lib/safe-actions";
import { del, put } from "@vercel/blob";
import * as z from "zod";

export const uploadImagesAction = authenticatedAction(
  z.instanceof(FormData),
  async (formData: FormData, context) => {
    if (context.user.role !== "ADMIN") {
      throw new ActionError("Vous n'êtes pas autorisé à faire cette action.");
    }

    const files = Array.from(formData.getAll("file")) as File[];

    if (files.length === 0) {
      throw new ActionError("No files found");
    }

    const results = await Promise.all(
      files.map(async (file, index) => {
        const name = file.name + index;

        const result = await put(name, file, {
          access: "public",
        });

        return result;
      })
    );

    return results;
  }
);

export const deleteImageAction = authenticatedAction(
  z.string(),
  async (url, context) => {
    if (context.user.role !== "ADMIN") {
      throw new ActionError("Vous n'êtes pas autorisé à faire cette action.");
    }

    if (!url) {
      throw new ActionError("No file to delete");
    }

    await del(url);
  }
);
