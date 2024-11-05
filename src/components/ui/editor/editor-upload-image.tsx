'use client';

import { type Editor } from '@tiptap/core';
import React, { useState } from 'react';
import { Image as LucideImage } from 'lucide-react';
import { Button } from '../button';
import { UploadAvatarModal } from '../upload-image/upload-avatar-modal';

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
        variant="link"
        onClick={() => setChangeAvatarOpen(true)}
      >
        <LucideImage size={18} />
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
