import { useUserInfoStore } from "@/stores/use-user-store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login } from "./api";
import webCookieStorage from "@/lib/web-cookie-storage";
import { useToast } from "@/hooks/use-toast";
import { isAxiosError } from "axios";

export const useLoginMutation = () => {
    const router = useRouter();
    const setUserInfo = useUserInfoStore((state) => state.setUserInfo);
    const { toast } = useToast();
    return useMutation({
        mutationFn: ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => login({ email, password }),
        onSuccess: (data) => {
            if (data.status === 200) {
                const { token, isNewUser, roleName, ...userData } = data.data!;
                webCookieStorage.setToken(token);
                if (isNewUser) {
                    webCookieStorage.setIsNewUser(JSON.stringify(isNewUser));
                }
                setUserInfo({
                    userId: userData.userId,
                    email: userData.email,
                    userName: userData.username,
                    isNewUser: isNewUser,
                    fullName: userData.fullname,
                    image: userData.image,
                    roleName: roleName,
                    lastLoginAt: userData.lastLoginAt,
                });
                if (
                    roleName?.toLowerCase() !== "admin" ||
                    roleName.toLocaleLowerCase() !== "moderator"
                ) {
                    toast({
                        title: "You are not allowed",
                        description: "Please visit highschool.vn for more",
                        variant: "destructive",
                    });
                } else {
                    router.push("/");
                }
            }
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                const errorMessage =
                    error.response?.data.message ||
                    "Unexpected error occurred!";
                return Promise.reject(new Error(errorMessage));
            }
            return Promise.reject(new Error("An unexpected error occurred."));
        },
    });
};
