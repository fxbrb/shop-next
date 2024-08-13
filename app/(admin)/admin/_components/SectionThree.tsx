import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToolbarButton } from "@/components/ui/toolbar-button";
import { DropdownMenuItemClass, activeItemClass, cn } from "@/lib/utils";
import type { Editor } from "@tiptap/core";
import { ChevronDown, List, ListOrdered } from "lucide-react";

export default function SectionThree({ editor }: { editor: Editor }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          isActive={
            editor.isActive("bulletList") || editor.isActive("orderedList")
          }
          tooltip="Liste"
          className="w-12"
        >
          <List className="size-5" />
          <ChevronDown className="size-5" />
        </ToolbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-full">
        <DropdownMenuItem
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(DropdownMenuItemClass, {
            [activeItemClass]: editor.isActive("orderedList"),
          })}
          aria-label="Numbered list"
        >
          <span className="grow flex items-center">
            <ListOrdered className="mr-2 size-4" />
            Liste triée
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(DropdownMenuItemClass, {
            [activeItemClass]: editor.isActive("bulletList"),
          })}
          aria-label="Bullet list"
        >
          <span className="grow flex items-center">
            <List className="mr-2 size-4" />
            Liste non ordonnée
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
