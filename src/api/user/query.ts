import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserRole, UserStatus } from "./type";
import { createAccount, getUserDetail, getUsers } from "./api";
import { useToast } from "@/hooks/use-toast";

export const useUsersQuery = ({
    page,
    eachPage,
    status = UserStatus.All,
    search,
    roleName,
}: {
    page: number;
    eachPage: number;
    status?: UserStatus;
    search?: string;
    roleName: UserRole;
}) => {
    return useQuery({
        queryKey: ["users", page, eachPage, status, search, roleName],
        queryFn: () =>
            getUsers({
                page: page,
                eachPage: eachPage,
                status: status,
                search: search,
                roleName: roleName,
            }),
    });
};

export const useUserDetailQuery = (email: string) => {
    return useQuery({
        queryKey: ["user-detail", email],
        queryFn: () => getUserDetail({ email }),
        enabled: !!email,
    });
};

export const useCreateUserMutation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationKey: ["create-user"],
        mutationFn: createAccount,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
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
    })

}