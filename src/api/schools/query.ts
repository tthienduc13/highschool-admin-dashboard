import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSchools } from "./api";

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
