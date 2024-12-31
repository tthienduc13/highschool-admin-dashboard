import { RefObject, useEffect, useRef, useState } from "react";
import { Tab } from ".";
import {
    IconAlignCenter,
    IconCards,
    IconFileDescription,
    IconHelpOctagon,
} from "@tabler/icons-react";
import { Skeleton } from "@/components/ui/skeleton";

type TabItemProps = {
    ref: RefObject<HTMLDivElement>;
    label: string;
    icon: React.ReactNode;
    value: Tab;
};

interface TabsProps {
    tab: Tab;
    onTabChange: React.Dispatch<React.SetStateAction<Tab>>;
    isLoading: boolean;
}

export const Tabs = ({ tab, onTabChange, isLoading }: TabsProps) => {
    const [activeTabStyle, setActiveTabStyle] = useState<React.CSSProperties>(
        {}
    );

    const detailTabRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const quizRef = useRef<HTMLDivElement>(null);
    const flashcardRef = useRef<HTMLDivElement>(null);

    const tabs: TabItemProps[] = [
        {
            ref: detailTabRef,
            label: "Course Detail",
            icon: <IconFileDescription size={16} />,
            value: "detail",
        },
        {
            ref: contentRef,
            label: " Content",
            icon: <IconAlignCenter size={16} />,
            value: "content",
        },
        {
            ref: flashcardRef,
            label: "Create Flashcard",
            icon: <IconCards size={16} />,
            value: "flashcard",
        },
        {
            ref: quizRef,
            label: "Create Quiz",
            icon: <IconHelpOctagon size={16} />,
            value: "quiz",
        },
    ];

    useEffect(() => {
        const updateActiveTabStyle = () => {
            const tabRef =
                tab === "detail"
                    ? detailTabRef.current
                    : tab === "content"
                        ? contentRef.current
                        : tab === "flashcard"
                            ? flashcardRef.current
                            : tab === "quiz"
                                ? quizRef.current
                                : null;

            if (tabRef) {
                setActiveTabStyle({
                    width: tabRef.clientWidth,
                    left: tabRef.offsetLeft,
                });
            }
        };
        updateActiveTabStyle();
        window.addEventListener("resize", updateActiveTabStyle);
        return () => window.removeEventListener("resize", updateActiveTabStyle);
    }, [tab]);

    const handleTabChange = (newTab: Tab) => {
        onTabChange(newTab);
    };

    if (isLoading) {
        return (
            <div className="no-scrollbar relative w-full overflow-x-scroll border-b-[1px]">
                <div className="flex flex-row items-center justify-between  py-2 md:justify-start md:gap-5">
                    {tabs.map(({ value }) => (
                        <Skeleton key={value} className="h-8 w-[100px]" />
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className="no-scrollbar relative w-full overflow-x-scroll border-b-[1px]">
            <div className="flex flex-row items-center justify-between  py-2 md:justify-start md:gap-5">
                {tabs.map(({ ref, label, icon, value }) => (
                    <div
                        key={value}
                        ref={ref}
                        onClick={() => handleTabChange(value)}
                        className={`cursor-pointer text-xs flex items-center gap-1 p-2 rounded-md ${tab === value
                                ? "font-bold text-blue text-primary bg-primary/10 border-primary"
                                : "text-muted-foreground font-semibold hover:bg-background hover:shadow"
                            }`}
                    >
                        {icon}
                        {label}
                    </div>
                ))}
            </div>
            <div
                className="absolute bottom-0 h-[2px] bg-primary transition-all duration-300"
                style={activeTabStyle}
            />
        </div>
    );
};
