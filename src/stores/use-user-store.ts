import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserInfo {
    userId: string | null;
    email: string | null;
    userName: string | null;
    fullName: string | null;
    isNewUser: boolean;
    roleName: string | null;
    image: string | null;
    lastLoginAt: Date | null;
    setUserInfo: (info: Partial<UserInfo>) => void;
    clearUserInfo: () => void;
}

export const useUserInfoStore = create(
    persist<UserInfo>(
        (set) => ({
            userId: null,
            userName: null,
            email: null,
            fullName: null,
            isNewUser: false,
            roleName: null,
            image: null,
            lastLoginAt: null,

            setUserInfo: (info) =>
                set((state) => ({
                    ...state,
                    ...info,
                })),

            clearUserInfo: () =>
                set(() => ({
                    userId: null,
                    userName: null,
                    email: null,
                    fullName: null,
                    isNewUser: false,
                    roleName: null,
                    image: null,
                    lastLoginAt: null,
                })),
        }),
        {
            name: "user-info-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
