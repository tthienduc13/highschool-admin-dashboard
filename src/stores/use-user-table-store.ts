import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export interface UserTableStoreProps {
    selectedUser: string;
    openUserInfo: boolean;
    openCreateModer: boolean;
}

interface UserTableState extends UserTableStoreProps {
    setSelectedUser: (email: string) => void;
    onOpenUserInfo: () => void;
    onCloseUserInfo: () => void;
    onOpenCreateModer: () => void;
    onCloseCreateModer: () => void;
}

export type UserTableStore = ReturnType<typeof createUserTableStore>;

export const createUserTableStore = (
    initProps?: Partial<UserTableStoreProps>
) => {
    const DEFAULT_PROPS: UserTableStoreProps = {
        selectedUser: "",
        openUserInfo: false,
        openCreateModer: false,
    };

    return createStore<UserTableState>()(
        subscribeWithSelector((set) => ({
            ...DEFAULT_PROPS,
            ...initProps,
            setSelectedUser: (email) => {
                set({ selectedUser: email });
            },
            onOpenUserInfo: () => {
                set({ openUserInfo: true, openCreateModer: false });
            },
            onCloseUserInfo: () => {
                set({ openUserInfo: false, selectedUser: "" });
            },
            onOpenCreateModer: () => {
                set({
                    openCreateModer: true,
                    selectedUser: "",
                    openUserInfo: false,
                });
            },
            onCloseCreateModer: () => {
                set({
                    openCreateModer: false,
                });
            },
        }))
    );
};

export const UserTableContext = createContext<UserTableStore | null>(null);

export const useUserTableContext = <T>(
    selector: (state: UserTableState) => T
): T => {
    const store = useContext(UserTableContext);
    if (!store)
        throw new Error("Missing UserTableContext.Provider in the tree");

    return useStore(store, selector);
};
