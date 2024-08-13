"use client";

import type { Editor as TiptapEditor } from "@tiptap/core";
import Blockquote from "@tiptap/extension-blockquote";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import { EditorContent, mergeAttributes, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import SectionFour from "../../../app/(admin)/admin/_components/SectionFour";
import SectionOne from "../../../app/(admin)/admin/_components/SectionOne";
import SectionThree from "../../../app/(admin)/admin/_components/SectionThree";
import SectionTwo from "../../../app/(admin)/admin/_components/SectionTwo";
import { Separator } from "./separator";

export const Tiptap = ({ val }: { val: string }) => {
  const { setValue } = useFormContext();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
      }),
      Heading.extend({
        levels: [1, 2, 3],
        renderHTML({ node, HTMLAttributes }) {
          const level = this.options.levels.includes(node.attrs.level)
            ? node.attrs.level
            : this.options.levels[0];
          const classes: { [index: number]: string } = {
            1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
            2: "text-3xl font-semibold tracking-tight",
            3: "text-2xl font-semibold tracking-tight",
          };
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              class: `${classes[level]}`,
            }),
            0,
          ];
        },
      }).configure({ levels: [1, 2] }),
      Blockquote.configure({
        HTMLAttributes: {
          class:
            "p-4 my-4 bg-gray-50 border-l-4 border-gray-300 dark:border-gray-500 dark:bg-gray-800 text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white",
        },
      }),
      Underline,
    ],

    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      const isContentEmpty = editor.isEmpty;

      setValue("description", isContentEmpty ? "" : content, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },

    editorProps: {
      attributes: {
        class:
          "prose mx-auto focus:outline-none max-w-none prose-stone dark:prose-invert",
      },
    },
    content: val,
  });

  useEffect(() => {
    if (editor?.isEmpty) {
      editor.commands.setContent(val);
    }
  }, [val]);

  return (
    <div className="flex h-auto min-h-72 w-full flex-col rounded-md border border-input focus-visible:outline-none  focus-within:ring-1 focus-within:ring-ring">
      {editor && <Toolbar editor={editor} />}
      <div
        className="h-full grow"
        onClick={() => editor?.chain().focus().run()}
      >
        <EditorContent editor={editor} className="p-5" />
      </div>
    </div>
  );
};

const Toolbar = ({ editor }: { editor: TiptapEditor }) => {
  return (
    <div className="border-b border-border p-2">
      <div className="flex w-full flex-wrap items-center">
        <SectionOne editor={editor} />
        <Separator orientation="vertical" className="mx-2 h-7" />
        <SectionTwo editor={editor} />
        <Separator orientation="vertical" className="mx-2 h-7" />
        <SectionThree editor={editor} />
        <Separator orientation="vertical" className="mx-2 h-7" />
        <SectionFour editor={editor} />
      </div>
    </div>
  );
};
