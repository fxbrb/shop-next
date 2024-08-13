import { Editor } from "@tiptap/core";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MinimalTiptapProps } from "../../app/(admin)/admin/_components/Tiptap";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`;
}

export const activeItemClass =
  "bg-accent/10 hover:bg-accent/10 focus:bg-accent/10";
export const DropdownMenuItemClass =
  "flex flex-row items-center justify-between gap-4";

export function getOutput(
  editor: Editor,
  format: MinimalTiptapProps["outputValue"]
) {
  if (format === "json") {
    const jsonValue = JSON.stringify(editor.getJSON());
    return editor.isEmpty ? "" : jsonValue;
  }

  if (format === "html") {
    return editor.getText() ? editor.getHTML() : "";
  }

  return editor.getText();
}
