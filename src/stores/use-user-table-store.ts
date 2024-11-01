import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export interface UserTableStoreProps {
    selectedUser: string;
    openUserInfo: boolean;
}

interface UserTableState extends UserTableStoreProps {
    setSelectedUser: (email: string) => void;
    onOpenUserInfo: () => void;
    onCloseUserInfo: () => void;
}

export type UserTableStore = ReturnType<typeof createUserTableStore>;

export const createUserTableStore = (
    initProps?: Partial<UserTableStoreProps>
) => {
    const DEFAULT_PROPS: UserTableStoreProps = {
        selectedUser: "",
        openUserInfo: false,
    };

    return createStore<UserTableState>()(
        subscribeWithSelector((set) => ({
            ...DEFAULT_PROPS,
            ...initProps,
            setSelectedUser: (email) => {
                set({ selectedUser: email });
            },
            onOpenUserInfo: () => {
                set({ openUserInfo: true });
            },
            onCloseUserInfo: () => {
                set({ openUserInfo: false, selectedUser: "" });
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
