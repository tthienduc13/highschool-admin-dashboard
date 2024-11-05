import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { dataUrlToBuffer } from '@/utils/data-url-to-buffer';
import { useFileReader } from '@/utils/use-file-reader';
import { Loader2, Upload } from 'lucide-react';
import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}
const MAX_IMAGE_SIZE = 512;

interface InnerModalProps {
  open: boolean;
  onOpenChange: () => void;
  isLoading?: boolean;
  onError?: (error: string) => void;
  onSubmitBuffer?: (buffer: ArrayBuffer) => void;
}

export const InnerModal = ({
  open,
  onOpenChange,
  isLoading,
  onError,
  onSubmitBuffer
}: InnerModalProps) => {
  const [crop, setCrop] = useState<Rect | null>(null);

  const [{ result }, setFile] = useFileReader({
    method: 'readAsDataURL'
  });

  const onInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }

    const limit = 5 * 1000000; // max limit 5MB
    const file = e.target.files[0]!;

    if (file.size > limit) {
      onError?.(
        `That file is too large! Max file size is ${limit / 1000000} MB`
      );
    } else {
      setFile(file);
    }
  };

  const submitBuffer = useCallback(
    async (crop: Rect | null) => {
      try {
        if (!crop) return;
        const croppedImage = await getCroppedImage(result as string, crop);
        const buffer = dataUrlToBuffer(croppedImage);
        onSubmitBuffer?.(buffer);
      } catch (e) {
        console.error(e);
      }
    },
    [onSubmitBuffer, result]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby={undefined}
        className="w-96 rounded-xl px-10"
      >
        <DialogTitle className="text-start text-2xl md:text-3xl">
          Change avatar
        </DialogTitle>
        <div className="flex flex-col items-center justify-center gap-y-6">
          <div className="relative h-40 w-40">
            {result ? (
              <CropContainer image={result as string} onComplete={setCrop} />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-y-4 text-gray-400">
                <Upload className="h-[100px] w-[100px]" />
                <div className="text-sm font-medium">
                  Image files up to 5 MB
                </div>
              </div>
            )}
          </div>
          <input
            onChange={onInputFile}
            style={{ display: 'none' }}
            type="file"
            id="upload-avatar-input"
            accept="image/*"
          />
          <label htmlFor="upload-avatar-input">
            <span className={cn(buttonVariants({}))}>Choose a file</span>
          </label>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onOpenChange}>
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            variant="default"
            onClick={() => submitBuffer(crop)}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface CropContainerProps {
  image: string;
  onComplete: (crop: Rect) => void;
}

const CropContainer: React.FC<CropContainerProps> = ({ image, onComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  return (
    <div>
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={1}
        onCropChange={setCrop}
        onCropComplete={(_, crop) => onComplete(crop)}
        onZoomChange={setZoom}
        cropShape="round"
        style={{
          containerStyle: {
            borderRadius: '12px'
          }
        }}
      />
    </div>
  );
};

const createImage = (url: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });
};

const getCroppedImage = async (src: string, crop: Rect): Promise<string> => {
  const image = await createImage(src);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  const maxSize = Math.max(image.naturalWidth, image.naturalHeight);
  const resizeRatio =
    MAX_IMAGE_SIZE / maxSize < 1 ? Math.max(MAX_IMAGE_SIZE / maxSize, 0.75) : 1;

  ctx.imageSmoothingEnabled = false;
  canvas.width = canvas.height = Math.min(maxSize * resizeRatio, crop.width);

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  if (resizeRatio <= 0.75) {
    // With a smaller image, thus improved ratio. Keep doing this until the resizeRatio > 0.75.
    return getCroppedImage(canvas.toDataURL('image/png'), {
      width: canvas.width,
      height: canvas.height,
      x: 0,
      y: 0
    });
  }

  return canvas.toDataURL('image/png');
};
