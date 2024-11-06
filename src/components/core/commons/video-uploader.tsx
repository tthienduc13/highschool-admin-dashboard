import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileVideo, Upload, X } from "lucide-react";
import {
    useMergeVideoMutation,
    useUploadVideoMutation,
} from "@/api/video/query";
import { CHUNK_SIZE } from "@/constants";
import { useToast } from "@/hooks/use-toast";

export default function VideoUploader({ lessonId }: { lessonId: string }) {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const { toast } = useToast();

    const { mutateAsync: uploadMutation, isPending: uploading } =
        useUploadVideoMutation();
    const { mutateAsync: mergeMutation, isPending: merging } =
        useMergeVideoMutation({ lessonId: lessonId });

    const handleUploadVideo = async (file: File) => {
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

        for (let chunkNumber = 0; chunkNumber < totalChunks; chunkNumber++) {
            const start = chunkNumber * CHUNK_SIZE;
            const end = Math.min(start + CHUNK_SIZE, file.size);
            const chunk = file.slice(start, end);

            try {
                const formData = new FormData();
                formData.append("file", chunk);
                formData.append("chunkNumber", chunkNumber.toString());
                formData.append("totalChunks", totalChunks.toString());
                formData.append("fileName", file.name);

                await uploadMutation({ formData });

                const progress = ((chunkNumber + 1) / totalChunks) * 100;
                setUploadProgress(progress);
            } catch (error) {
                console.error(
                    `Error uploading chunk ${chunkNumber + 1}:`,
                    error
                );
                throw error;
            }
        }

        try {
            const result = await mergeMutation({
                fileName: file.name,
            });

            toast({
                title: result.success
                    ? "Video uploaded successfully"
                    : "Video upload failed",
                variant: "default",
                description: result.message,
            });

            setUploadProgress(100); // Set progress to 100% when done
        } catch (error) {
            console.error("Error merging chunks:", error);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (file) {
            handleUploadVideo(file);
        }
    };

    const handleRemove = () => {
        setFile(null);
        setUploadProgress(0);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div
                className={`border-2 border-dashed rounded-lg p-8 ${
                    dragActive ? "border-primary" : "border-gray-300"
                } transition-colors duration-300 ease-in-out`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    id="video-upload"
                    className="hidden"
                    accept="video/*"
                    onChange={handleChange}
                />
                <label
                    htmlFor="video-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                >
                    {file ? (
                        <div className="text-center">
                            <FileVideo className="w-12 h-12 text-primary mx-auto mb-4" />
                            <p className="text-sm text-gray-500 mb-2">
                                {file.name}
                            </p>
                            <p className="text-xs text-gray-400">
                                {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                        </div>
                    ) : (
                        <>
                            <Upload className="w-12 h-12 text-gray-400 mb-4" />
                            <p className="text-sm text-gray-500 mb-2">
                                Drag and drop your video here, or click to
                                select
                            </p>
                            <p className="text-xs text-gray-400">
                                MP4, WebM, or Ogg (max 512MB)
                            </p>
                        </>
                    )}
                </label>
            </div>
            {file && (
                <div className="mt-4">
                    <Progress value={uploadProgress} className="w-full mb-2" />
                    <div className="flex justify-between">
                        <Button
                            onClick={handleUpload}
                            disabled={
                                uploading || merging || uploadProgress > 0
                            }
                        >
                            {uploading || merging ? "Uploading..." : "Upload"}
                        </Button>
                        <Button variant="outline" onClick={handleRemove}>
                            <X className="w-4 h-4 mr-2" />
                            Remove
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
