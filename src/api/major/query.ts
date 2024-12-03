import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMajor, createMajorCategory, deleteMajor, deleteMajorCategory, getMajor, getMajorCategory, getMajorCategoryName, getMajorName, updateMajor, updateMajorCategory } from "./api";
import { useToast } from "@/hooks/use-toast";

export const useGetMajorQuery = ({
    search,
    pageNumber,
    pageSize
}: Partial<{
    search: string;
    pageNumber: number;
    pageSize: number;
}>) => {
    return useQuery({
        queryKey: ["major", search, pageNumber, pageSize],
        queryFn: () => getMajor({
            search,
            pageNumber,
            pageSize
        })
    })
}

export const useGetMajorNameQuery = ({
    search,
    pageNumber,
    pageSize
}: Partial<{
    search: string;
    pageNumber: number;
    pageSize: number;
}>) => {
    return useQuery({
        queryKey: ["major-name", search, pageNumber, pageSize],
        queryFn: () => getMajorName({
            search,
            pageNumber,
            pageSize
        })
    })
}

export const useDeleteMajorMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationKey: ["delete-major"],
        mutationFn: deleteMajor,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["major"] });
            queryClient.invalidateQueries({ queryKey: ["major-name"] });
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
        }
    })

}

export const useCreateMajorMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationKey: ["create-major"],
        mutationFn: createMajor,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["major"] });
            queryClient.invalidateQueries({ queryKey: ["major-name"] });
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
        }
    })
}

export const useUpdateMajorMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationKey: ["update-major"],
        mutationFn: updateMajor,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["major"] });
            queryClient.invalidateQueries({ queryKey: ["major-name"] });
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
        }
    })
}

export const useGetMajorCategoryQuery = ({
    search,
    pageNumber,
    pageSize
}: Partial<{
    search: string;
    pageNumber: number;
    pageSize: number;
}>) => {
    return useQuery({
        queryKey: ["major-category", search, pageNumber, pageSize],
        queryFn: () => getMajorCategory({
            search,
            pageNumber,
            pageSize
        })
    })
}

export const useGetMajorCategoryNameQuery = ({
    search,
    pageNumber,
    pageSize
}: Partial<{
    search: string;
    pageNumber: number;
    pageSize: number;
}>) => {
    return useQuery({
        queryKey: ["major-category-name", search, pageNumber, pageSize],
        queryFn: () => getMajorCategoryName({
            search,
            pageNumber,
            pageSize
        })
    })
}

export const useCreateMajorCategoryMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationKey: ["create-major-category"],
        mutationFn: createMajorCategory,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["major-category"] });
            queryClient.invalidateQueries({ queryKey: ["major-category-name"] });
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
        }
    })
}

export const useUpdateMajorCategoryMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationKey: ["update-major-category"],
        mutationFn: updateMajorCategory,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["major-category"] });
            queryClient.invalidateQueries({ queryKey: ["major-category-name"] });
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
        }
    })
}

export const useDeleteMajorCategoryMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationKey: ["delete-major-category"],
        mutationFn: deleteMajorCategory,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["major-category"] });
            queryClient.invalidateQueries({ queryKey: ["major-category-name"] });
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
        }
    })
}