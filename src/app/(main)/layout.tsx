import RootMainLayout from "@/components/core/layouts/main-layout";
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
    return (
        <div className="h-screen w-screen no-scrollbar">
            <RootMainLayout>{children}</RootMainLayout>
        </div>
    );
}
