import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Class } from "./type";
import {
    createSubject,
    deleteCourse,
    getAllCourses,
    getCourseById,
    getUnpublisedCourse,
    getUnpublishedCourseById,
    updateSubject,
} from "./api";
import { useToast } from "@/hooks/use-toast";
import useMasterCourseStore from "@/stores/use-master-course-store";

export const useCoursesQuery = ({
    search,
    grade,
    pageNumber,
    pageSize,
}: {
    search?: string;
    grade?: Class | null;
    pageNumber: number;
    pageSize: number;
}) => {
    return useQuery({
        queryKey: ["courses", search, grade, pageNumber, pageSize],
        queryFn: () =>
            getAllCourses({
                search: search,
                pageNumber: pageNumber,
                pageSize: pageSize,
                grade: grade,
            }),
    });
};

export const useUnpublishedCourseQuery = ({
    search,
    grade,
    pageNumber,
    pageSize,
}: {
    search?: string;
    grade?: Class;
    pageNumber: number;
    pageSize: number;
}) => {
    return useQuery({
        queryKey: ["unpulished-courses", search, grade, pageNumber, pageSize],
        queryFn: () =>
            getUnpublisedCourse({
                search: search,
                pageNumber: pageNumber,
                pageSize: pageSize,
                grade: grade,
            }),
    });
};

export const useCreateCourseMutation = () => {
    const queryClient = useQueryClient();
    const closeCreate = useMasterCourseStore((s) => s.closeCreate);
    const { toast } = useToast();
    return useMutation({
        mutationKey: ["create", "course"],
        mutationFn: createSubject,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["courses"],
            });
            console.log(data);
            toast({
                title: data.message,
            });
            closeCreate();
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

export const useUpdateCourseMutation = () => {
    const queryClient = useQueryClient();
    const closeEdit = useMasterCourseStore((s) => s.closeEdit);
    const { toast } = useToast();
    return useMutation({
        mutationKey: ["update", "course"],
        mutationFn: updateSubject,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["courses"],
            });
            console.log(data);
            toast({
                title: data.message,
            });
            closeEdit();
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

export const useDeleteCourseMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    return useMutation({
        mutationKey: ["delete"],
        mutationFn: deleteCourse,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["courses"],
            });
            toast({
                title: data.message ?? "Delete successfully",
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

export const useCourseIdQuery = (courseId: string) => {
    return useQuery({
        queryKey: ["course-detail", courseId],
        queryFn: () => getCourseById(courseId),
        enabled: !!courseId,
    });
};

export const useGetUnpublishedCourseByIdQuery = (courseId: string) => {
    return useQuery({
        queryKey: ["unpublished-course-detail", courseId],
        queryFn: () => getUnpublishedCourseById(courseId),
    });
};
