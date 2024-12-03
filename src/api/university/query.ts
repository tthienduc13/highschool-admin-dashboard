import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUniversityList, createUniversityMajorList, deleteUniversity, deleteUniversityMajor, getUniversity, getUniversityMajor, getUniversityMajorName, getUniversityName, updateUniversity, updateUniversityMajor } from "./api";
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

export const useUniversityNameQuery = ({
    search,
    pageNumber,
    pageSize,
}: Partial<{
    search: string;
    pageNumber: number;
    pageSize: number;
}>) => {
    return useQuery({
        queryKey: ["university-name", search, pageNumber, pageSize],
        queryFn: () => getUniversityName({
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

export const useUniversityMajorQuery = ({
    search,
    pageNumber,
    pageSize,
}: Partial<{
    search: string;
    pageNumber: number;
    pageSize: number;
}>) => {
    return useQuery({
        queryKey: ["university-major", search, pageNumber, pageSize],
        queryFn: () => getUniversityMajor({
            pageSize: pageSize || 10,
            pageNumber: pageNumber || 1,
            uniCode: search || ""
        })
    });
}

export const useUniversityMajorNameQuery = ({
    search,
    pageNumber,
    pageSize,
}: Partial<{
    search: string;
    pageNumber: number;
    pageSize: number;
}>) => {
    return useQuery({
        queryKey: ["university-major-name", search, pageNumber, pageSize],
        queryFn: () => getUniversityMajorName({
            pageSize: pageSize || 10,
            pageNumber: pageNumber || 1,
            search: search || ""
        })
    });
}

export const useCreateUniversityMajorListMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationKey: ["create-university-major"],
        mutationFn: createUniversityMajorList,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["university-major"] });
            toast({
                title: data.message ?? "Create successfully",
            });

            return data;
        },
        onError: (error) => {
            toast({
                title: error.message ?? "Some error occured",
                variant: "destructive"
            });
        },
    });
}

export const useUpdateUniversityMajorMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationKey: ["update-university-major"],
        mutationFn: updateUniversityMajor,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["university-major"] });
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

export const useDeleteUniversityMajorMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationKey: ["delete-university-major"],
        mutationFn: deleteUniversityMajor,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["university-major"] });
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

