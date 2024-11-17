import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProvinces, getProvinces } from "./api";
import { useToast } from "@/hooks/use-toast";

export const useCreateProvincesMutation = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create-province"],
        mutationFn: createProvinces,
        onSuccess: (data) => {
            toast({
                title: data.message ?? "Provinces added",
            });
            queryClient.invalidateQueries({ queryKey: ["provinces"] });
        },
        onError: (error) => {
            toast({
                title: error.message ?? "Some errors occured",
                variant: "destructive",
            });
        },
    });
};

export const useProvincesQuery = ({
    search,
    pageSize,
    pageNumber,
}: {
    search?: string;
    pageSize: number;
    pageNumber: number;
}) => {
    return useQuery({
        queryKey: ["provinces", search, pageSize, pageNumber],
        queryFn: () =>
            getProvinces({
                search: search,
                pageSize: pageSize,
                pageNumber: pageNumber,
            }),
    });
};
