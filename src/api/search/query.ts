import { useQuery } from "@tanstack/react-query";
import { search } from "./api";
import { SearchType } from "./type";

export const useSearchQuery = ({
    value,
    type,
}: {
    value?: string;
    type: SearchType;
}) => {
    return useQuery({
        queryKey: ["search", type, value],
        queryFn: () => search({ value: value!, type: type }),
        enabled: !!value,
    });
};
