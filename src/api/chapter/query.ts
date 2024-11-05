import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createChapterList, getChaptersByCourse } from "./api";
import { useToast } from "@/hooks/use-toast";

export const useGetChaptersQuery = ({
    search,
    courseId,
    pageNumber,
    pageSize,
}: {
    search?: string;
    courseId: string;
    pageNumber: number;
    pageSize: number;
}) => {
    return useQuery({
        queryKey: ["chapters", courseId, search, pageSize, pageNumber],
        queryFn: () =>
            getChaptersByCourse({
                search: search,
                courseId: courseId,
                pageSize: pageSize,
                pageNumber: pageNumber,
            }),
        enabled: !!courseId,
    });
};

export const useCreateChapterListMutation = ({
    courseId,
}: {
    courseId: string;
}) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create-chapter", courseId],
        mutationFn: createChapterList,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["chapters"],
            });
            return data;
        },
        onError: (error) => {
            toast({
                title: error.message ?? "Something error occured",
                description: "Please try again later",
                variant: "destructive",
            });
        },
    });
};
