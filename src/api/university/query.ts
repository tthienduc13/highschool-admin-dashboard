import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUniversityList, deleteUniversity, getUniversity, updateUniversity } from "./api";
import { useToast } from "@/hooks/use-toast";

export const useUniversityQuery = ({
    search,
    pageNumber,
    pageSize,
}: Partial<{
    search: string;
    pageNumber: number;
    pageSize: number;
}>) => {
    return useQuery({
        queryKey: ["university", search, pageNumber, pageSize],
        queryFn: () => getUniversity({
            pageSize: pageSize || 10,
            pageNumber: pageNumber || 1,
            search: search || ""
        })
    });
}

export const useCreateUniversityListMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();


    return useMutation({
        mutationKey: ["create-university"],
        mutationFn: createUniversityList,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["university"] });
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
}

export const useDeleteUniversityMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationKey: ["delete-university"],
        mutationFn: deleteUniversity,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["university"] });
            toast({
                title: data.message ?? "Delete successfully",
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
}

export const useUpdateUniversityMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationKey: ["update-university"],
        mutationFn: updateUniversity,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["university"] });
            toast({
                title: data.message ?? "Update successfully",
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
}