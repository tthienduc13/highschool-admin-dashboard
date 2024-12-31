import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createQuiz, getQuestions } from "./api"
import { useToast } from "@/hooks/use-toast"

export const useGetQuestionsQuery = ({
    questionCategory,
    categoryId
}: Partial<{
    questionCategory: string,
    categoryId: string
}>) => {
    return useQuery({
        queryKey: ["questions", questionCategory, categoryId],
        queryFn: () =>
            getQuestions({
                questionCategory,
                categoryId
            })
    })
}

export const useCreateQuestionMutation = ({ questionCategory, categoryId }: {
    questionCategory: string,
    categoryId: string,
}) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createQuiz,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["questions", questionCategory, categoryId]
            });
            toast({
                title: data.message,
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
    })

}