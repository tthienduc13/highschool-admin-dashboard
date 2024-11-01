import { useQuery } from "@tanstack/react-query";
import { UserRole, UserStatus } from "./type";
import { getUserDetail, getUsers } from "./api";

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
