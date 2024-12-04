import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCurriculum, getCurriculum } from "./api";
import { useToast } from "@/hooks/use-toast";

export const useCurriculumQuery = () => {
    return useQuery({
        queryKey: ["curriculum"],
        queryFn: getCurriculum,
    });
};

export const useCurriculumMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationKey: ["curriculum"],
        mutationFn: createCurriculum,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["curriculum"],
            });
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
