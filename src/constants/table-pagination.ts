interface RowPerPageOptionProps {
    value: string;
    label: string;
}

export const RowPerPageOptions: RowPerPageOptionProps[] = [
    { value: "10", label: "10 per page" },
    { value: "25", label: "25 per page" },
    { value: "50", label: "50 per page" },
    { value: "100", label: "100 per page" },
];
