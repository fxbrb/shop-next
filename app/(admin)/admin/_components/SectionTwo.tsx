import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToolbarButton } from "@/components/ui/toolbar-button";
import { DropdownMenuItemClass, activeItemClass, cn } from "@/lib/utils";
import { Editor } from "@tiptap/core";
import { Bold, Ellipsis, Italic, Strikethrough, Underline } from "lucide-react";

export default function SectionTwo({ editor }: { editor: Editor }) {
  return (
    <>
      {/* BOLD */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can().chain().focus().toggleBold().run() ||
          editor.isActive("codeBlock")
        }
        isActive={editor.isActive("bold")}
        tooltip="Gras"
        aria-label="Bold"
      >
        <Bold className="size-5" />
      </ToolbarButton>

      {/* ITALIC */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can().chain().focus().toggleItalic().run() ||
          editor.isActive("codeBlock")
        }
        isActive={editor.isActive("italic")}
        tooltip="Italique"
        aria-label="Italic"
      >
        <Italic className="size-5" />
      </ToolbarButton>

      {/* STRIKE, CODE, CLEAR FORMATTING */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ToolbarButton
            isActive={editor.isActive("strike") || editor.isActive("underline")}
            tooltip="Plus d'options..."
            aria-label="More formatting"
          >
            <Ellipsis className="size-5" />
          </ToolbarButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-full">
          <DropdownMenuItem
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={
              !editor.can().chain().focus().toggleStrike().run() ||
              editor.isActive("codeBlock")
            }
            className={cn(DropdownMenuItemClass, {
              [activeItemClass]: editor.isActive("strike"),
            })}
            aria-label="Strikethrough"
          >
            <span className="flex grow items-center">
              <Strikethrough className="mr-2 size-4" />
              Strikethrough
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={
              !editor.can().chain().focus().toggleUnderline().run() ||
              editor.isActive("codeBlock")
            }
            className={cn(DropdownMenuItemClass, {
              [activeItemClass]: editor.isActive("underline"),
            })}
            aria-label="Underline"
          >
            <span className="flex grow items-center">
              <Underline className="mr-2 size-4" />
              Souligner
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
            disabled={
              !editor.can().chain().focus().unsetAllMarks().run() ||
              editor.isActive("codeBlock")
            }
            className={cn(DropdownMenuItemClass)}
            aria-label="Clear formatting"
          >
            <span className="grow">Supprimer le formattage</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
