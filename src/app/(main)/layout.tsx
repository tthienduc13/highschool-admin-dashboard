import AppSideBar from "@/components/core/commons/app/app-sidebar";
import constants from "@/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const hasToken = cookieStore.has(constants.ACCESS_TOKEN);
    if (!hasToken) redirect("/sign-in");
    return <AppSideBar>{children}</AppSideBar>;
}
