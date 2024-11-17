'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";
import { ComboboxTag } from "../create-news/combobox-tag";
import { useQuery } from "@tanstack/react-query";
import { getProvince } from "@/api/external/country/country.api";
import { useRouter } from "next/navigation";
import ListNews from "./list-news";
import { useNewsQuery } from "@/api/news/news.query";
import { useDebounceValue } from "@/hooks/use-debounce-value";
import { Skeleton } from "@/components/ui/skeleton";



function NewsManagementModule() {
    const [tag, setTag] = useState('')
    const titleHeading = "All blogs";
    const [searchQuery, setSearchQuery] = useState('')
    const router = useRouter();
    const [selectedProvince, setSelectedProvince] = useState<string>("");
    const [page, setPage] = useState(1);

    const { data: countryData } = useQuery({
        queryKey: ["province"],
        queryFn: getProvince,
    });

    const debounceSearch = useDebounceValue(searchQuery, 300);

    const {
        data: initialNewsData,
        isLoading,
    } = useNewsQuery({
        search: debounceSearch,
        page: page,
        eachPage: 9,
        newsTagId: tag === "" ? null : tag,
        location: selectedProvince === "" ? null : selectedProvince,
    });

    return (
        <div className="px-4 py-8">
            {/* Header Section */}
            <div className="flex flex-col gap-6 mb-8">
                <div className="text-3xl font-bold text-primary">
                    {titleHeading}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                    <div className="flex gap-3 w-[50vw]">
                        <div className="relative w-[60vw]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search blogs..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <ComboboxTag setTag={setTag} />

                        <Select
                            value={selectedProvince ?? ""}
                            onValueChange={setSelectedProvince}
                        >
                            <SelectTrigger className="mr-4 rounded-lg border-2 bg-background text-left">
                                <SelectValue
                                    placeholder="Select your province"
                                    className="px-4"
                                />
                            </SelectTrigger>
                            <SelectContent
                                onCloseAutoFocus={(e) =>
                                    e.preventDefault()
                                }
                                className="h-[50vh] overflow-y-auto placeholder:text-muted-foreground"
                            >
                                {countryData?.map((country) => (
                                    <SelectItem
                                        key={country.code}
                                        value={country.name}
                                    >
                                        {country.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>



                    <Button
                        className="bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => router.push("/news-management/create")}
                    >
                        Create blog
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="group bg-white rounded-lg overflow-hidden border border-border transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                        >
                            <Skeleton className="h-[30vh] w-full" />
                        </div>
                    ))}

                </div>
            ) : initialNewsData && <ListNews listNews={initialNewsData} page={page} setPage={setPage} />}
        </div>
    );
}

export default NewsManagementModule;
