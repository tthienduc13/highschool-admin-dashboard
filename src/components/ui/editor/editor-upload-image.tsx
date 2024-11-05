'use client';

import { type Editor } from '@tiptap/core';
import React, { useState } from 'react';
import { Image as LucideImage } from 'lucide-react';
import { Button } from '../button';
import { UploadAvatarModal } from '../upload-image/upload-avatar-modal';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';

export interface UploadImageProps {
  activeEditor: Editor | null;
}

export const EditorUploadImage: React.FC<UploadImageProps> = ({
  activeEditor
}) => {
  const [changeAvatarOpen, setChangeAvatarOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        onClick={() => setChangeAvatarOpen(true)}
        className={cn(
          'rounded-full',
        )}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild><LucideImage size={16} /></TooltipTrigger>
            <TooltipContent>
              <p>Upload image</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Button>

      <UploadAvatarModal
        open={changeAvatarOpen}
        onOpenChange={() => setChangeAvatarOpen(false)}
        activeEditor={activeEditor}
      />
    </>
  );
};

export default EditorUploadImage;
