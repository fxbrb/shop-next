import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToolbarButton } from "@/components/ui/toolbar-button";
import { DropdownMenuItemClass, activeItemClass, cn } from "@/lib/utils";
import type { Editor } from "@tiptap/core";
import { ChevronDown, Minus, Plus, Quote } from "lucide-react";

export default function SectionFour({ editor }: { editor: Editor }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          isActive={
            editor.isActive("codeBlock") || editor.isActive("blockquote")
          }
          tooltip="Plus d'options..."
          className="w-12"
        >
          <Plus className="size-5" />
          <ChevronDown className="size-5" />
        </ToolbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-full">
        <DropdownMenuItem
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn(DropdownMenuItemClass, {
            [activeItemClass]: editor.isActive("blockquote"),
          })}
        >
          <span className="flex grow items-center">
            <Quote className="mr-2 size-4" />
            Citer
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <span className="flex grow items-center">
            <Minus className="mr-2 size-4" />
            Insérer une ligne horizontale
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
