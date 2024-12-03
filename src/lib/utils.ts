import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
    const date = new Date(input);
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

export function absoluteUrl(path: string) {
    return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function formatBytes(
    bytes: number,
    opts: {
        decimals?: number;
        sizeType?: "accurate" | "normal";
    } = {}
) {
    const { decimals = 0, sizeType = "normal" } = opts;

    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
    if (bytes === 0) return "0 Byte";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${sizeType === "accurate"
        ? accurateSizes[i] ?? "Bytest"
        : sizes[i] ?? "Bytes"
        }`;
}

export function getRandomHexColor(): string {
    // Generate a random number between 0 and 0xFFFFFF
    const randomNumber = Math.floor(Math.random() * 0xFFFFFF);
    // Convert the number to a hexadecimal string and pad with leading zeros if needed
    const hexString = randomNumber.toString(16).padStart(6, '0');
    // Return the color in hex format
    return `#${hexString}`;
}

export const generateYearOptions = (startYear: number, endYear: number, sortOrder: 'asc' | 'desc' = 'asc') => {
    const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => {
        const year = startYear + i;
        return {
            label: year.toString(),
            value: year.toString(),
        };
    });

    // Sort the years based on the provided sortOrder
    return years.sort((a, b) =>
        sortOrder === 'asc' ? Number(a.value) - Number(b.value) : Number(b.value) - Number(a.value)
    );
};
