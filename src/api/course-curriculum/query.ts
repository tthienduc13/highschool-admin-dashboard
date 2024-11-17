import { PaginationPayload } from "./../common/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
    create,
    getPublished,
    getUnpublished,
    publishCourse,
    unpublishCourse,
} from "./api";
import { useRouter } from "next/navigation";

type QueryParams = PaginationPayload & {
    search?: string;
};
export const useCreateMutation = (onClose: () => void) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create", "subject-currculum"],
        mutationFn: create,
        onSuccess: (data) => {
            if (data.status === 200 || data.status === 201) {
                toast({
                    title: data.message ?? "Create success",
                });
                queryClient.invalidateQueries({
                    queryKey: ["unpublished-courses"],
                });
            } else {
                toast({
                    title: data.message ?? "Error",
                    variant: "destructive",
                });
            }
            onClose();
            return data;
        },
        onError: (data) => {
            toast({
                title: data.message ?? "An error occured",
                variant: "destructive",
            });
            onClose();
            return data;
        },
    });
};

export const usePublishedQuery = ({
    search,
    pageSize,
    pageNumber,
}: QueryParams) => {
    return useQuery({
        queryKey: ["published-courses", pageNumber, pageSize, search],
        queryFn: () =>
            getPublished({
                search: search,
                pageSize: pageSize,
                pageNumber: pageNumber,
            }),
    });
};

export const useUnpublishedQuery = ({
    search,
    pageSize,
    pageNumber,
}: QueryParams) => {
    return useQuery({
        queryKey: ["unpublished-courses", pageNumber, pageSize, search],
        queryFn: () =>
            getUnpublished({
                search: search,
                pageSize: pageSize,
                pageNumber: pageNumber,
            }),
    });
};

export const usePublishMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const router = useRouter();
    return useMutation({
        mutationKey: ["publish"],
        mutationFn: publishCourse,
        onSuccess: (data) => {
            if (data.status === 200) {
                queryClient.invalidateQueries({
                    queryKey: ["published-courses", "unpulished-courses"],
                });
                toast({
                    title: data.message ?? "Publish success",
                });
                router.push(`/course-management/courses`);
            } else {
                toast({
                    title: data.message ?? "An error occured",
                    variant: "destructive",
                });
            }
        },
        onError: (error) => {
            toast({ title: error.message, variant: "destructive" });
        },
    });
};

export const useUnpublishMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const router = useRouter();
    return useMutation({
        mutationKey: ["unpublish"],
        mutationFn: unpublishCourse,
        onSuccess: (data) => {
            // if (data.status === 200) {
            //     queryClient.invalidateQueries({
            //         queryKey: ["courses", "unpulished-courses"],
            //     });
            //     toast({
            //         title: data.message,
            //     });
            //     router.push(
            //         `/course-management/unpublished-courses/${data.data}`
            //     );
            // }
            if (data.status === 200) {
                queryClient.invalidateQueries({
                    queryKey: ["published-courses", "unpulished-courses"],
                });
                toast({
                    title: data.message ?? "Unpublish success",
                });
                router.push(`/course-management/unpublished-courses`);
            } else {
                toast({
                    title: data.message ?? "An error occured",
                    variant: "destructive",
                });
            }
        },
        onError: (error) => {
            toast({ title: error.message, variant: "destructive" });
        },
    });
};
