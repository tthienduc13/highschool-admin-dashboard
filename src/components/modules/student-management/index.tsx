"use client";

import {
    createUserTableStore,
    UserTableContext,
} from "@/stores/use-user-table-store";
import { InternalStudenManagement } from "./internal-student-management";

function StudentManagementModule() {
    const userTableStore = createUserTableStore();

    return (
        <UserTableContext.Provider value={userTableStore}>
            <InternalStudenManagement />
        </UserTableContext.Provider>
    );
}

export default StudentManagementModule;
