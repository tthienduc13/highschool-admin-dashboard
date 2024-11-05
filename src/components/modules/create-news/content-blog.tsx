'use client';


import { BubbleMenuBar } from '@/components/core/commons/editor/bubble-menu';
import { SelectorBar } from '@/components/core/commons/editor/selector-bar';
import { customEditorConfig } from '@/components/ui/editor/editor-config';
import { EditorGlobalStyles } from '@/components/ui/editor/editor-global-style';
import { EditorContent, useEditor } from '@tiptap/react';
import React, { useState } from 'react';

type Props = {
  contentHtml: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setContentHtml: React.Dispatch<React.SetStateAction<string>>;
};

export const ContentBlog = (props: Props) => {
  const [theoryFocused, setTheoryFocused] = useState<boolean>(false);
  // const { mutateAsync: upSertMutation, isPending: loading } =
  //     useTheoryUpSertMutation({
  //         fileName: theoryName,
  //         imageFiles: imageFiles,
  //         imageDocuments: documentFiles
  //     });

  const contentEditor = useEditor({
    ...customEditorConfig(),
    content: props.contentHtml,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      props.setContentHtml(editor.getHTML());
      props.setContent(editor.getText());
    },
    onCreate: ({ editor }) => {
      if (theoryFocused) {
        editor.chain().focus();
      }
    }
  });

  return (
    <div className="w-full">
      <SelectorBar activeEditor={contentEditor} />
      <EditorGlobalStyles />
      <BubbleMenuBar activeEditor={contentEditor} />
      <div
        onFocus={() => setTheoryFocused(true)}
        onBlur={() => setTheoryFocused(false)}
      >
        {contentEditor && (
          <EditorContent
            editor={contentEditor}
            className="rounded-xl border bg-white px-8 py-4 outline-none focus-visible:ring-0"
            style={{ minHeight: '330px' }} // Enforce min-height via inline style
            placeholder='Start writing your news here...'
          />
        )}
      </div>
    </div>
  );
};
