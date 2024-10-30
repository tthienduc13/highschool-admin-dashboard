import constants from "@/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootAuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const hasToken = cookieStore.has(constants.ACCESS_TOKEN);
    if (hasToken) redirect("/");

    return <>{children}</>;
}
