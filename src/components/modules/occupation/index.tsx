"use client"

import { UseGetOccupationsQuery } from "@/api/occupation/query";
import { OccupationCard } from "./occupation-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { useDebounceValue } from "@/hooks/use-debounce-value";
import { ImportOccupationMajorButton } from "./button-import";
import { useRouter } from "next/navigation";

function OccupationModule() {
    const [searchQuery, setSearchQuery] = useState('')
    const debounceSearch = useDebounceValue(searchQuery, 300);
    const { data: occupations, isPending: isOccupationLoading } = UseGetOccupationsQuery({
        pageNumber: 1,
        pageSize: 10,
        search: debounceSearch,
    });
    const router = useRouter();

    return (
        <div className="px-4 py-8 space-y-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-primary">Career Paths</h1>
                <p className="text-muted-foreground">
                    Explore detailed information about different career paths and their requirements
                </p>
            </div>

            <div className="flex justify-between">
                <div className="relative w-[30vw]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search career..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-4">
                    <ImportOccupationMajorButton />
                    {/* <Button>Download Template</Button> */}
                    <Button onClick={() => router.push("/career-mentor/occupation/create")}>
                        <IconPlus /> Create Career Path
                    </Button>
                </div>
            </div>

            {
                !isOccupationLoading ? (
                    <OccupationCard careers={occupations?.data} />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="group bg-white rounded-lg overflow-hidden border border-border transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                            >
                                <Skeleton className="h-[30vh] w-full" />
                            </div>
                        ))}

                    </div>
                )
            }


        </div>
    )
}

export default OccupationModule;