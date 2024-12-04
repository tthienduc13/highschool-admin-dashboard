import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSchools, getProvinceSchools, getSchools } from "./api";

export const useCreateSchoolMutation = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create-schools"],
        mutationFn: createSchools,
        onSuccess: (data) => {
            toast({
                title: data.message ?? "Schools added",
            });
            queryClient.invalidateQueries({ queryKey: ["schools"] });
        },
        onError: (error) => {
            toast({
                title: error.message ?? "Some errors occured",
                variant: "destructive",
            });
        },
    });
};

export const useSchoolsQuery = ({
    search,
    pageSize,
    pageNumber,
}: {
    search?: string;
    pageSize: number;
    pageNumber: number;
}) => {
    return useQuery({
        queryKey: ["schools", search, pageSize, pageNumber],
        queryFn: () =>
            getSchools({
                search: search,
                pageSize: pageSize,
                pageNumber: pageNumber,
            }),
    });
};

export const useProvinceSchoolQuery = ({
    provinceId,
    search,
    pageSize,
    pageNumber,
}: {
    search?: string;
    provinceId: string;
    pageSize: number;
    pageNumber: number;
}) => {
    return useQuery({
        queryKey: ["schools", provinceId, search, pageSize, pageNumber],
        queryFn: () =>
            getProvinceSchools({
                search: search,
                pageNumber: pageNumber,
                pageSize: pageSize,
                provinceId: provinceId,
            }),
        enabled: !!provinceId,
    });
};

export const useSchoolFilterQuery = ({
    search,
    pageSize,
    pageNumber,
    provinceId
}: {
    search?: string;
    pageSize: number;
    pageNumber: number;
    provinceId?: string | null;
}) => {
    return useQuery({
        queryKey: ["schools", search, provinceId, pageSize, pageNumber],
        queryFn: () => {
            if (provinceId) {
                return getProvinceSchools({
                    search: search,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    provinceId: provinceId,
                });
            } else {
                return getSchools({
                    search: search,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                });
            }
        }
    });
}
