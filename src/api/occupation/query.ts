import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateOccupation, DeleteOccupation, GetOccupations, UpdateOccupation } from "./api";
import { useToast } from "@/hooks/use-toast";

export const UseGetOccupationsQuery = ({
    search,
    pageNumber,
    pageSize
}: Partial<{
    search?: string | null;
    pageNumber: number;
    pageSize: number;
}>) => {
    return useQuery({
        queryKey: ["occupations", search, pageNumber, pageSize],
        queryFn: () => GetOccupations({
            search,
            pageNumber,
            pageSize
        })
    })
}

export const UseCreateOccupationMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationKey: ["create-occupation"],
        mutationFn: CreateOccupation,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["occupations"] });
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

export const useUpdateOccupationMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationKey: ["update-occupation"],
        mutationFn: UpdateOccupation,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["occupations"] });
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

export const useDeleteOccupationMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationKey: ["delete-occupation"],
        mutationFn: DeleteOccupation,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["occupations"] });
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