import * as React from 'react'

import type { Content, Editor } from '@tiptap/react'
import { EditorContent } from '@tiptap/react'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import SectionOne from '@/components/core/commons/minimal-editor/section/one'
import useMinimalTiptapEditor, { UseMinimalTiptapEditorProps } from '@/hooks/editor/use-minimal-tiptap'
import SectionTwo from '@/components/core/commons/minimal-editor/section/two'
import SectionThree from '@/components/core/commons/minimal-editor/section/three'
import SectionFour from '@/components/core/commons/minimal-editor/section/four'
import SectionFive from '@/components/core/commons/minimal-editor/section/five'
import { MeasuredContainer } from '@/components/core/commons/minimal-editor/measured-container'
import { LinkBubbleMenu } from '@/components/core/commons/minimal-editor/bubble-menu/link-bubble-menu'
import FormatContent from '@/components/core/commons/minimal-editor/section/format-content'
import { ContentData } from './types'

export interface MinimalTiptapProps extends Omit<UseMinimalTiptapEditorProps, 'onUpdate'> {
  value?: Content
  onChange?: (value: Content) => void
  setContentData: (data: ContentData) => void
  className?: string
  editorContentClassName?: string
}

const Toolbar = ({ editor }: { editor: Editor }) => (
  <div className="shrink-0 overflow-x-auto border-b border-border p-2">
    <div className="flex w-max items-center gap-px">
      <SectionOne editor={editor} activeLevels={[1, 2, 3, 4, 5, 6]} />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionTwo
        editor={editor}
        activeActions={['bold', 'italic', 'underline', 'strikethrough', 'code', 'clearFormatting']}
        mainActionCount={3}
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <FormatContent editor={editor}
        activeActions={['alignLeft', 'alignCenter', 'alignRight', 'alignJustify']}
        mainActionCount={4}
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionThree editor={editor} />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFour editor={editor} activeActions={['orderedList', 'bulletList']} mainActionCount={0} />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFive editor={editor} activeActions={['codeBlock', 'blockquote', 'horizontalRule']} mainActionCount={0} />

    </div>
  </div>
)

export const MinimalTiptapEditor = React.forwardRef<HTMLDivElement, MinimalTiptapProps>(
  ({ value, onChange, className, editorContentClassName, ...props }, ref) => {
    const editor = useMinimalTiptapEditor({
      value,
      onUpdate: onChange,
      ...props
    })

    if (!editor) {
      return null
    }

    return (
      <MeasuredContainer
        as="div"
        name="editor"
        ref={ref}
        className={cn(
          'flex h-auto min-h-72 w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary',
          className
        )}
      >
        <Toolbar editor={editor} />
        <EditorContent editor={editor} className={cn('minimal-tiptap-editor', editorContentClassName)} />
        <LinkBubbleMenu editor={editor} />
      </MeasuredContainer>
    )
  }
)

MinimalTiptapEditor.displayName = 'MinimalTiptapEditor'

export default MinimalTiptapEditor
