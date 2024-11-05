import React, { useRef } from 'react';
import { Button } from '../button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';
import { FileUp } from 'lucide-react';
import { Editor } from '@tiptap/core';
import { Input } from '../input';
import * as mammoth from "mammoth/mammoth.browser";


type EditorUploadImageProp = {
    activeEditor: Editor | null;
}

export const EditorUploadFile: React.FC<EditorUploadImageProp> = ({
    activeEditor
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const arrayBuffer = e.target?.result;

                // Ensure result is an ArrayBuffer
                if (arrayBuffer && arrayBuffer instanceof ArrayBuffer) {
                    try {
                        // Convert the ArrayBuffer to HTML with mammoth
                        const result = await mammoth.convertToHtml({ arrayBuffer });
                        const html = result.value;

                        // Insert the HTML content into the editor if available
                        activeEditor?.commands.insertContent(html);
                        if (inputRef.current) {
                            inputRef.current.value = '';
                        }
                    } catch (error) {
                        console.error("Error converting document:", error);
                    }
                } else {
                    console.error("Failed to read file as ArrayBuffer");
                }
            };

            reader.onerror = () => {
                console.error("Error reading file as ArrayBuffer");
            };

            reader.readAsArrayBuffer(file);
        }
    }

    return (
        <>
            <Button
                type="button"
                variant="ghost"
                className={cn('rounded-full')}
                onClick={handleUpload}
            >
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild><FileUp size={16} /></TooltipTrigger>
                        <TooltipContent>
                            <p>Upload file</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </Button>

            <Input
                ref={inputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept=".docx"
            />
        </>
    );
};
