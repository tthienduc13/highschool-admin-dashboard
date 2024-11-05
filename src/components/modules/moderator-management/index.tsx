"use client";

import {
    createUserTableStore,
    UserTableContext,
} from "@/stores/use-user-table-store";
import { InternalModeratorManagement } from "./internal-moderator-management";

function ModeratorManagementModule() {
    const userTableStore = createUserTableStore();

    return (
        <UserTableContext.Provider value={userTableStore}>
            <InternalModeratorManagement />
        </UserTableContext.Provider>
    );
}

export default ModeratorManagementModule;
