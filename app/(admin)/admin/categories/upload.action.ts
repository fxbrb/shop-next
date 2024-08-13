"use server";

import { ActionError, authenticatedAction } from "@/lib/safe-actions";
import { del, put } from "@vercel/blob";
import * as z from "zod";

export const uploadImageAction = authenticatedAction(
  z.instanceof(FormData),
  async (formData: FormData) => {
    const file = formData.get("file") as File;

    if (!file) {
      throw new ActionError("File not found");
    }
    const name = file.name;

    const result = await put(name, file, {
      access: "public",
    });

    return result;
  }
);

export const deleteImageAction = authenticatedAction(
  z.string(),
  async (url: string) => {
    if (!url) {
      throw new ActionError("No file to delete");
    }
    await del(url);
  }
);
