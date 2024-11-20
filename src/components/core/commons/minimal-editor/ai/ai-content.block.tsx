import * as React from 'react'
import type { Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { typeContentList } from './type'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Textarea } from '@/components/ui/textarea'
import { useGenerateAIMutation } from '@/api/external/ai/ai.query'
import { useToast } from '@/hooks/use-toast'
import { extractBodyContent } from '@/utils/utils'
import { Bot } from 'lucide-react'

interface AIContentBlockProps {
    editor: Editor
    close: () => void
}

export const AIContentBlock: React.FC<AIContentBlockProps> = ({ editor, close }) => {
    const [status, setStatus] = React.useState<number>()
    const { toast } = useToast();
    const [description, setDescription] = React.useState('')
    const { mutateAsync: generateAI, isPending: isLoading } =
        useGenerateAIMutation();

    const handleGenerate = async () => {

        let content = editor.getText();

        if (status == undefined) {
            toast({
                title: "Failed",
                variant: "destructive",
                description: "Content type is required",
            });

            return;
        } else if (status === 2) {
            content = description;

            if (!content) {
                toast({
                    title: "Failed",
                    variant: "destructive",
                    description: "Description is required",
                });

                return;
            } else if (content.length < 10) {
                toast({
                    title: "Failed",
                    variant: "destructive",
                    description: "Description must be at least 10 characters",
                });

                return;
            }
        } else {
            if (!content) {
                toast({
                    title: "Failed",
                    variant: "destructive",
                    description: "Content is required",
                });

                return;
            } else if (content.length < 10) {
                toast({
                    title: "Failed",
                    variant: "destructive",
                    description: "Content must be at least 10 characters",
                });

                return;
            }
        }

        try {
            const result = await generateAI({ text: content, contentType: status })

            if (status === 1) {
                editor?.commands.clearContent();
            }

            editor?.commands.insertContent(extractBodyContent(result.data as unknown as string));

            close()

            toast({
                title: "Success",
                variant: "default",
                description: result.message,
            });

        } catch {
            toast({
                title: "Failed",
                variant: "destructive",
                description: "Failed to generate AI content",
            });
        }
    }

    return (
        <div className="space-y-6">
            <TooltipProvider>
                <Select
                    value={status as unknown as string}
                    onValueChange={(value) => {
                        console.log(value)
                        setStatus(value as unknown as number);
                    }}
                    disabled={isLoading}
                >
                    <SelectTrigger className="h-8 w-fit">
                        <div className='flex items-center'>
                            <Bot className="w-4 dark:text-white" />
                            <div className="h-6 w-[1px] bg-black/10 dark:bg-white/10 mx-2" />
                            <SelectValue placeholder="what can I help you with?" />
                        </div>
                    </SelectTrigger>
                    <SelectContent side="top">
                        {typeContentList.map((status) => (
                            <SelectItem key={status.key} value={status.value as unknown as string}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <p>{status.key}</p>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{status.detail}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </TooltipProvider>
            <div className="space-y-1">
                <Label htmlFor="image-link">Description content (prompt)</Label>
                <div className="flex">
                    <Textarea
                        id="image-link"
                        className="w-full"
                        placeholder="Enter your description content"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={(status !== 2) || isLoading}
                    />
                </div>
            </div>
            <Button type="button" className="w-full" disabled={isLoading} onClick={handleGenerate}>
                {isLoading ? 'Thinking...' : 'Generate'}
            </Button>
        </div>
    )
}

export default AIContentBlock
