import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createLessonList,
    getLessonById,
    getLessonsByChapter,
    updateLesson,
} from "./api";
import { useToast } from "@/hooks/use-toast";

export const useLessonsQuery = ({
    search,
    chapterId,
    pageNumber,
    pageSize,
}: {
    search?: string;
    chapterId: string;
    pageNumber: number;
    pageSize: number;
}) => {
    return useQuery({
        queryKey: [
            "lessons-in-chapter",
            chapterId,
            search,
            pageNumber,
            pageSize,
        ],
        queryFn: () =>
            getLessonsByChapter({
                search: search,
                pageNumber: pageNumber,
                pageSize: pageSize,
                chapterId: chapterId,
            }),
        enabled: !!chapterId,
    });
};

export const useCreateLessonListMutations = ({
    chapterId,
}: {
    chapterId: string;
}) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create-lessons", chapterId],
        mutationFn: createLessonList,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["lessons-in-chapter", chapterId],
            });
            toast({
                title: data.message,
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

export const useLessonQuery = ({ lessonId }: { lessonId: string }) => {
    return useQuery({
        queryKey: ["lesson", lessonId],
        queryFn: () => getLessonById({ lessonId: lessonId }),
        enabled: !!lessonId,
    });
};

export const useUpdateLesson = ({ chapterId }: { chapterId: string }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["update"],
        mutationFn: updateLesson,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["lessons-in-chapter", chapterId],
            });
            console.log(data);
            return data;
        },
    });
};
