import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItemClass, activeItemClass, cn } from "@/lib/utils";
import type { Editor } from "@tiptap/core";
import type { Level } from "@tiptap/extension-heading";

import { ToolbarButton } from "@/components/ui/toolbar-button";
import { ALargeSmall, ChevronDown } from "lucide-react";

export default function SectionOne({ editor }: { editor: Editor }) {
  const toggleHeading = (level: Level) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          isActive={editor.isActive("heading")}
          tooltip="Paragraphe format"
          className="w-12"
          disabled={editor.isActive("codeBlock")}
        >
          <ALargeSmall className="size-5" />
          <ChevronDown className="size-5" />
        </ToolbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-full">
        <DropdownMenuItem
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={cn(DropdownMenuItemClass, {
            [activeItemClass]: editor.isActive("paragraph"),
          })}
          aria-label="Normal text"
        >
          <span className="grow">Normal Text</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => toggleHeading(1)}
          className={cn(DropdownMenuItemClass, {
            [activeItemClass]: editor.isActive("heading", { level: 1 }),
          })}
          aria-label="Heading 1"
        >
          <h1 className="m-0 grow text-3xl font-extrabold">Heading 1</h1>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => toggleHeading(2)}
          className={cn(DropdownMenuItemClass, {
            [activeItemClass]: editor.isActive("heading", { level: 2 }),
          })}
          aria-label="Heading 2"
        >
          <h2 className="m-0 grow text-xl font-bold">Heading 2</h2>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => toggleHeading(3)}
          className={cn(DropdownMenuItemClass, {
            [activeItemClass]: editor.isActive("heading", { level: 3 }),
          })}
          aria-label="Heading 3"
        >
          <h3 className="m-0 grow text-lg font-semibold">Heading 3</h3>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
