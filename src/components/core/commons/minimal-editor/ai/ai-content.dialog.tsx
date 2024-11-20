import type { Editor } from '@tiptap/react'
import type { VariantProps } from 'class-variance-authority'
import type { toggleVariants } from '@/components/ui/toggle'
import { useState } from 'react'
import { ToolbarButton } from '../toolbar-button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import AIContentBlock from './ai-content.block'
import { IconWand } from '@tabler/icons-react'

interface AIContentDialogProps extends VariantProps<typeof toggleVariants> {
    editor: Editor
}

const AIContentDialog = ({ editor, size, variant }: AIContentDialogProps) => {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <ToolbarButton
                    tooltip="AI"
                    aria-label="AI"
                    size={size}
                    variant={variant}
                >
                    <IconWand className="size-5" />
                </ToolbarButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>AI Content</DialogTitle>
                    <DialogDescription className="sr-only">AI helper for people</DialogDescription>
                </DialogHeader>
                <AIContentBlock editor={editor} close={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}

export { AIContentDialog }
