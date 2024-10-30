import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useUserInfoStore } from "@/stores/use-user-store";
import {
    IconLogout2,
    IconMoon,
    IconSelector,
    IconSun,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { logout } from "./logout";

export const UserButton = () => {
    const { theme, setTheme } = useTheme();
    const userInfo = useUserInfoStore();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                            src={userInfo.image!}
                            alt={userInfo.fullName!}
                        />
                        <AvatarFallback className="rounded-lg">
                            HS
                        </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                            {userInfo.fullName}
                        </span>
                        <span className="truncate text-xs">
                            {userInfo.email}
                        </span>
                    </div>
                    <IconSelector size={16} className="ml-auto " />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage
                                src={userInfo.image!}
                                alt={userInfo.fullName!}
                            />
                            <AvatarFallback className="rounded-lg">
                                HS
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">
                                {userInfo.fullName}
                            </span>
                            <span className="truncate text-xs">
                                {userInfo.email}
                            </span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={toggleTheme}>
                        {theme === "dark" ? <IconSun /> : <IconMoon />}
                        {theme === "dark" ? "Light mode" : "Dark mode"}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                    <IconLogout2 />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
