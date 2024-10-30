import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./theme-provider";
import { QueryClientProvider } from "./query-client-provider";

export default function AppProviders({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <QueryClientProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
                <Toaster />
            </ThemeProvider>
        </QueryClientProvider>
    );
}
