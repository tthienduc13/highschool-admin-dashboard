import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDocument, deleteDocument, getDocument, uploadDocument } from "./api";

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

export const useDocumentQuery = ({
    pageSize,
    pageNumber,
    seach,
    sortPopular,
    schoolId,
    subjectIds,
    semester,
    documentYear,
    provinceId,
    categoryIds,
    curriculumIds
}: Partial<{
    pageSize: number;
    pageNumber: number;
    seach?: string;
    sortPopular?: boolean;
    schoolId?: string | null;
    subjectIds?: string;
    semester?: number | null;
    documentYear?: number | null;
    provinceId?: string | null;
    categoryIds?: string;
    curriculumIds?: string;
}>) => {
    return useQuery({
        queryKey: ["documents", { pageSize, pageNumber, seach, sortPopular, schoolId, subjectIds, semester, documentYear, provinceId, categoryIds, curriculumIds }],
        queryFn: () => getDocument({
            pageSize,
            pageNumber,
            seach,
            sortPopular,
            schoolId,
            subjectIds,
            semester,
            documentYear,
            provinceId,
            categoryIds,
            curriculumIds
        })

    })
}

export const useDeleteDocumentMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationKey: ["delete-document"],
        mutationFn: (documentId: string) => {
            return deleteDocument(documentId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["documents"] });
            toast({
                title: "Document deleted successfully",
            });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description:
                    error.message ||
                    "An error occurred while deleting the document.",
                variant: "destructive",
            });
        },
    });
}