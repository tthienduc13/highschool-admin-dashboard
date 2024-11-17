import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { createDocument, uploadDocument } from "./api";

export const useUploadfileMutation = () => {
    const { toast } = useToast();
    return useMutation({
        mutationKey: ["document-media"],
        mutationFn: uploadDocument,
        onSuccess: () => {
            toast({
                title: "File uploaded successfully",
                description: "Your file has been uploaded.",
            });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description:
                    error.message ||
                    "An error occurred while uploading the file.",
                variant: "destructive",
            });
        },
    });
};

export const useCreateDocumentMutation = ({ file }: { file: File }) => {
    const { toast } = useToast();
    const { mutate: uploadFile } = useUploadfileMutation();
    return useMutation({
        mutationKey: ["create-document"],
        mutationFn: createDocument,
        onSuccess: (data) => {
            if (data.status === 201) {
                toast({
                    title: data.message,
                });
                uploadFile({ documentId: data.data!, file: file });
            }
            return;
        },
        onError: (error) => {
            toast({
                title: "Error",
                description:
                    error.message ||
                    "An error occurred while uploading the file.",
                variant: "destructive",
            });
        },
    });
};
