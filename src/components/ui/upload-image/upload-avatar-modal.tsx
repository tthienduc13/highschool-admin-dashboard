
import { useUploadImageToCloudinary } from '@/api/external/cloudinary/upload-image.query';
import { InnerModal } from './inner-upload-modal';
import { Editor } from '@tiptap/react';

interface UploadAvatarModalProps {
  open: boolean;
  onOpenChange: () => void;
  setImageUrl: (value: string) => void;
  activeEditor?: Editor | null;
}

export const UploadAvatarModal = ({
  open,
  onOpenChange,
  setImageUrl,
  activeEditor
}: UploadAvatarModalProps) => {
  const { mutateAsync: uploadImage, isPending: uploadPending } =
    useUploadImageToCloudinary();
  // const { mutateAsync: updateUserInfo, isPending: updatePending } = useUpdateBaseUserInfo()
  const handleUploadImage = async (buffer: ArrayBuffer) => {
    const file = new File([new Blob([buffer])], 'avatar.png', {
      type: 'image/png'
    });

    try {
      const data = await uploadImage({ file });
      setImageUrl(data);
      activeEditor?.chain().focus().setImageCustom({ src: data, alignment: "left" }).run();
      onOpenChange();
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <InnerModal
      open={open}
      onOpenChange={onOpenChange}
      onError={(error) => {
        console.log(error);
      }}
      isLoading={uploadPending}
      onSubmitBuffer={handleUploadImage}
    />
  );
};
