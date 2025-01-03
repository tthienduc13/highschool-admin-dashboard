"use client";

import * as React from "react";
import {
    AudioWaveform,
    ChevronRight,
    ChevronsUpDown,
    Command,
    Folder,
    Forward,
    GalleryVerticalEnd,
    Map,
    MapIcon,
    MoreHorizontal,
    PieChart,
    Plus,
    Settings2,
    Trash2,
} from "lucide-react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import {
    IconBook,
    IconBriefcase2,
    IconLayoutDashboard,
    IconNews,
    IconPaperclip,
} from "@tabler/icons-react";
import Link from "next/link";
import { UserButton } from "./user-button";
const data = {
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Master data",
            url: "/master-data",
            isActive: true,
            icon: Settings2,
            items: [
                {
                    title: "Region",
                    url: "/master-data/region",
                },
                {
                    title: "Schools",
                    url: "/master-data/school",
                },
                {
                    title: "Course",
                    url: "/master-data/courses",
                },
                {
                    title: "Limits",
                    url: "#",
                },
                {
                    title: "University",
                    url: "/master-data/university",
                },
            ],
        },
        {
            title: "Subject Managments",
            url: "#",
            icon: IconBook,
            items: [
                {
                    title: "Published Course",
                    url: "/course-management/courses",
                },
                {
                    title: "Unpublished Course",
                    url: "/course-management/unpublished-courses",
                },
            ],
        },
        {
            title: "Document Managments",
            url: "#",
            icon: IconPaperclip,
            items: [
                {
                    title: "All documents",
                    url: "/document-management/documents",
                },
                {
                    title: "Create",
                    url: "/document-management/create",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "News management",
            url: "#",
            icon: IconNews,
            items: [
                {
                    title: "News",
                    url: "/news-management",
                },
                {
                    title: "Create New",
                    url: "/news-management/create",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Career Mentor",
            url: "#",
            icon: IconBriefcase2,
            items: [
                {
                    title: "MBTI",
                    url: "/career-mentor/mbti",
                },
                {
                    title: "Majors",
                    url: "/career-mentor/major",
                },
                {
                    title: "Major Category",
                    url: "/career-mentor/major-category",
                },
                {
                    title: "Occupation",
                    url: "/career-mentor/occupation",
                },
            ],
        },
        {
            title: "Roadmap Managments",
            url: "#",
            icon: MapIcon,
            items: [
                {
                    title: "Roadmap List",
                    url: "/roadmap-management/roadmaps",
                },
                {
                    title: "Unpublished Course",
                    url: "/course-management/unpublished-courses",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: MapIcon,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
};

interface ModeratorSidebarProps {
    children: React.ReactNode;
}

export default function ModeratorSidebar({ children }: ModeratorSidebarProps) {
    const [activeTeam, setActiveTeam] = React.useState(data.teams[0]);
    return (
        <SidebarProvider>
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-primary data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                            {/* <activeTeam.logo className="size-4" /> */}
                                        </div>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                {activeTeam.name}
                                            </span>
                                            <span className="truncate text-xs">
                                                {activeTeam.plan}
                                            </span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                    align="start"
                                    side="bottom"
                                    sideOffset={4}
                                >
                                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                                        Teams
                                    </DropdownMenuLabel>
                                    {data.teams.map((team, index) => (
                                        <DropdownMenuItem
                                            key={team.name}
                                            onClick={() => setActiveTeam(team)}
                                            className="gap-2 p-2"
                                        >
                                            <div className="flex size-6 items-center justify-center rounded-sm border">
                                                <team.logo className="size-4 shrink-0" />
                                            </div>
                                            {team.name}
                                            <DropdownMenuShortcut>
                                                ⌘{index + 1}
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    ))}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="gap-2 p-2">
                                        <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                            <Plus className="size-4" />
                                        </div>
                                        <div className="font-medium text-muted-foreground">
                                            Add team
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup className="group/collapsible">
                        <SidebarGroupLabel>General</SidebarGroupLabel>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={"Dashboard"}
                                >
                                    <Link href={"/"}>
                                        <IconLayoutDashboard />{" "}
                                        <span>Dashboard</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                    <SidebarGroup>
                        <SidebarGroupLabel>Platform</SidebarGroupLabel>
                        <SidebarMenu>
                            {data.navMain.map((item) => (
                                <Collapsible
                                    key={item.title}
                                    asChild
                                    defaultOpen={item.isActive}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                            >
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items?.map((subItem) => (
                                                    <SidebarMenuSubItem
                                                        key={subItem.title}
                                                    >
                                                        <SidebarMenuSubButton
                                                            asChild
                                                        >
                                                            <a
                                                                href={
                                                                    subItem.url
                                                                }
                                                            >
                                                                <span>
                                                                    {
                                                                        subItem.title
                                                                    }
                                                                </span>
                                                            </a>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                        <SidebarGroupLabel>Projects</SidebarGroupLabel>
                        <SidebarMenu>
                            {data.projects.map((item) => (
                                <SidebarMenuItem key={item.name}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.name}</span>
                                        </a>
                                    </SidebarMenuButton>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <SidebarMenuAction showOnHover>
                                                <MoreHorizontal />
                                                <span className="sr-only">
                                                    More
                                                </span>
                                            </SidebarMenuAction>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className="w-48 rounded-lg"
                                            side="bottom"
                                            align="end"
                                        >
                                            <DropdownMenuItem>
                                                <Folder className="text-muted-foreground" />
                                                <span>View Project</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Forward className="text-muted-foreground" />
                                                <span>Share Project</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Trash2 className="text-muted-foreground" />
                                                <span>Delete Project</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </SidebarMenuItem>
                            ))}
                            <SidebarMenuItem>
                                <SidebarMenuButton className="text-sidebar-foreground/70">
                                    <MoreHorizontal className="text-sidebar-foreground/70" />
                                    <span>More</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <UserButton />
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
            <SidebarInset className="bg-[#F7FAFC] dark:bg-[#171923]">
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Building Your Application
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        Data Fetching
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex  flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
