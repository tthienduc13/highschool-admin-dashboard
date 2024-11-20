import * as React from 'react'
import type { Editor } from '@tiptap/react'
import type { toggleVariants } from '@/components/ui/toggle'
import type { VariantProps } from 'class-variance-authority'
import { ToolbarSection } from '../toolbar-section'
import { FormatAction } from '@/components/ui/minimal-editor/types'
import { IconAlignCenter, IconAlignJustified, IconAlignLeft, IconAlignRight } from '@tabler/icons-react'

type ListItemAction = 'alignLeft' | 'alignCenter' | 'alignRight' | 'alignJustify'
interface ListItem extends FormatAction {
    value: ListItemAction
}

const formatActions: ListItem[] = [
    {
        value: 'alignLeft',
        label: 'Align left',
        icon: <IconAlignLeft size={18} />,
        isActive: editor => editor.isActive({ textAlign: "left" }),
        action: editor => editor.chain().focus().setTextAlign("left").run(),
        canExecute: editor => !editor.can().chain().focus().setTextAlign("left").run(),
        shortcuts: ['mod', 'shift', 'L']
    },
    {
        value: 'alignCenter',
        label: 'Align center',
        icon: <IconAlignCenter size={18} />,
        isActive: editor => editor.isActive({ textAlign: "center" }),
        action: editor => editor.chain().focus().setTextAlign("center").run(),
        canExecute: editor => !editor.can().chain().focus().setTextAlign("center").run(),
        shortcuts: ['mod', 'shift', 'C']
    },
    {
        value: 'alignRight',
        label: 'Align right',
        icon: <IconAlignRight size={18} />,
        isActive: editor => editor.isActive({ textAlign: "right" }),
        action: editor => editor.chain().focus().setTextAlign("right").run(),
        canExecute: editor => !editor.can().chain().focus().setTextAlign("right").run(),
        shortcuts: ['mod', 'shift', 'R']
    },
    {
        value: 'alignJustify',
        label: 'Align justify',
        icon: <IconAlignJustified size={18} />,
        isActive: editor => editor.isActive({ textAlign: "justify" }),
        action: editor => editor.chain().focus().setTextAlign("justify").run(),
        canExecute: editor => !editor.can().chain().focus().setTextAlign("justify").run(),
        shortcuts: ['mod', 'shift', 'J']
    }
];

interface FormatContentProps extends VariantProps<typeof toggleVariants> {
    editor: Editor
    activeActions?: ListItemAction[]
    mainActionCount?: number
}

export const FormatContent: React.FC<FormatContentProps> = ({
    editor,
    activeActions = formatActions.map(action => action.value),
    mainActionCount = 0,
    size,
    variant
}) => {
    return (
        <ToolbarSection
            editor={editor}
            actions={formatActions}
            activeActions={activeActions}
            mainActionCount={mainActionCount}
            size={size}
            variant={variant}
        />
    )
}

FormatContent.displayName = 'Format Content'

export default FormatContent
