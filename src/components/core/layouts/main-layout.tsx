"use client";

import { useUserInfoStore } from "@/stores/use-user-store";
import dynamic from "next/dynamic";

const AdminSidebar = dynamic(
    () => import("@/components/core/commons/app/admin-sidebar")
);
const ModeratorSidebar = dynamic(
    () => import("@/components/core/commons/app/moderator-sidebar")
);

export default function RootMainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const roleName = useUserInfoStore((state) => state.roleName);

    if (!roleName) {
        return null;
    }

    if (roleName.toLowerCase() === "admin") {
        return <AdminSidebar>{children}</AdminSidebar>;
    }

    return <ModeratorSidebar>{children}</ModeratorSidebar>;
}
