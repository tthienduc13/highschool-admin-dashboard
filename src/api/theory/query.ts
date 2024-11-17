import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createTheory,
    deleteTheory,
    getLessonTheory,
    getTheoryById,
} from "./api";
import { useToast } from "@/hooks/use-toast";

export const useGetLessonTheoryQuery = ({
    lessonId,
    pageSize,
    pageNumber,
    search,
}: {
    lessonId: string;
    pageSize: number;
    pageNumber: number;
    search?: string;
}) => {
    return useQuery({
        queryKey: ["theory-in-lesson", lessonId, search, pageNumber, pageSize],
        queryFn: () =>
            getLessonTheory({
                search: search,
                id: lessonId,
                pageNumber: pageNumber,
                pageSize: pageSize,
            }),
        enabled: !!lessonId,
    });
};

export const useCreateTheoryMutation = ({ lessonId }: { lessonId: string }) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create-theory", lessonId],
        mutationFn: createTheory,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["theory-in-lesson", lessonId],
            });
            toast({
                title: data.message ?? "Create successfully",
            });
            return data;
        },
        onError: (error) => {
            toast({
                title: error.message ?? "Some error occured",
                variant: "destructive",
            });
        },
    });
};

export const useGetTheoryQuery = ({ theoryId }: { theoryId: string }) => {
    return useQuery({
        queryKey: ["theory", theoryId],
        queryFn: () => getTheoryById({ theoryId: theoryId }),
        enabled: !!theoryId,
    });
};

export const useDeleteTheoryMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    return useMutation({
        mutationKey: ["delete-theory"],
        mutationFn: deleteTheory,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["theory-in-lesson"],
            });
            toast({
                title: data.data ?? "Delete successfully",
            });
            return data;
        },
        onError: (error) => {
            toast({
                title: error.message ?? "Some error occured",
                variant: "destructive",
            });
        },
    });
};
