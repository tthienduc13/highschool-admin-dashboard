import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export interface HintProps {
    label?: string;
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
}

export const Hint = ({
    label,
    children,
    side,
    align,
    sideOffset,
    alignOffset,
}: HintProps) => {
    if (!label) {
        return children;
    }
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent
                    asChild
                    // className="border-black  text-white dark:bg-white dark:text-slate-900"
                    side={side}
                    align={align}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                >
                    <div className="font-medium capitalize">{label}</div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
