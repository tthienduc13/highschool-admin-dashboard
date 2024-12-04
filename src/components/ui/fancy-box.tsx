"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { DialogClose } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { groupBy } from "lodash";

export type FancyBoxType = {
    value: string;
    label: string;
    groupBy?: string;
    color?: string;
    information?: string;
}

const defaultColor = "#f8fafc";

const badgeStyle = (color: string) => ({
    borderColor: `${color}20`,
    backgroundColor: `${color}30`,
    color,
});

interface FancyBoxProps {
    items: FancyBoxType[];
    selectedValues: FancyBoxType[];
    setSelectedValues: React.Dispatch<React.SetStateAction<FancyBoxType[]>>;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    createTag?: Function;
    disabled?: boolean;
}

export function FancyBox({ items, selectedValues, setSelectedValues, createTag, disabled }: FancyBoxProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [frameworks, setFrameworks] = React.useState<FancyBoxType[]>(items);
    const [openCombobox, setOpenCombobox] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [inputValue, setInputValue] = React.useState<string>("");
    // const [selectedValues, setSelectedValues] = React.useState<FancyBoxType[]>([
    //     FRAMEWORKS[0],
    // ]);

    const createFramework = (name: string) => {
        const newFramework = {
            value: name.toLowerCase(),
            label: name,
            color: "#ffffff",
        };
        setFrameworks((prev) => [...prev, newFramework]);
        setSelectedValues((prev) => [...prev, newFramework]);
        if (createTag) createTag();
    };

    const toggleFramework = (framework: FancyBoxType) => {
        setSelectedValues((currentFrameworks) =>
            !currentFrameworks.includes(framework)
                ? [...currentFrameworks, framework]
                : currentFrameworks.filter((l) => l.value !== framework.value),
        );
        inputRef?.current?.focus();
    };

    const updateFramework = (framework: FancyBoxType, newFramework: FancyBoxType) => {
        setFrameworks((prev) =>
            prev.map((f) => (f.value === framework.value ? newFramework : f)),
        );
        setSelectedValues((prev) =>
            prev.map((f) => (f.value === framework.value ? newFramework : f)),
        );
    };

    const deleteFramework = (framework: FancyBoxType) => {
        setFrameworks((prev) => prev.filter((f) => f.value !== framework.value));
        setSelectedValues((prev) =>
            prev.filter((f) => f.value !== framework.value),
        );
    };

    const onComboboxOpenChange = (value: boolean) => {
        inputRef.current?.blur(); // HACK: otherwise, would scroll automatically to the bottom of page
        setOpenCombobox(value);
    };

    const [groupByFrameworks, setGroupByFrameworks] = React.useState<[string, FancyBoxType[]][]>([])
    const [isGroupBy, setIsGroupBy] = React.useState(false)

    React.useEffect(() => {
        const result = groupBy(frameworks, 'groupBy');
        const entries = Object.entries(result)
        setGroupByFrameworks(entries)
        if (entries.length > 1) setIsGroupBy(true)
    }, [frameworks])

    return (
        <div className="">
            <Popover open={openCombobox} onOpenChange={onComboboxOpenChange}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openCombobox}
                        className="w-full justify-between text-foreground"
                        disabled={disabled ?? false}
                    >
                        <span className="truncate">
                            {selectedValues.length === 0 && "Select labels"}
                            {selectedValues.length === 1 && selectedValues[0].label}
                            {selectedValues.length === 2 &&
                                selectedValues.map(({ label }) => label).join(", ")}
                            {selectedValues.length > 2 &&
                                `${selectedValues.length} labels selected`}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className={`w-full p-0`}>
                    <Command loop>
                        <CommandInput
                            ref={inputRef}
                            placeholder="Search framework..."
                            value={inputValue}
                            onValueChange={setInputValue}
                        />
                        <CommandList>
                            <CommandGroup className="max-h-[145px] overflow-auto">
                                {
                                    groupByFrameworks.map(([key, frameworks]) => (
                                        <div key={key}>
                                            {
                                                isGroupBy && (
                                                    <span key={key} className="text-foreground text-[0.8rem] font-bold">{key}</span>
                                                )
                                            }
                                            <DropdownListItem
                                                frameworks={frameworks}
                                                selectedValues={selectedValues}
                                                toggleFramework={toggleFramework}
                                            />
                                        </div>
                                    ))
                                }
                                <CommandItemCreate
                                    onSelect={() => createFramework(inputValue)}
                                    {...{ inputValue, frameworks }}
                                />
                            </CommandGroup>
                            <CommandSeparator alwaysRender />
                            {/* <CommandGroup>
                                <CommandItem
                                    value={`:${inputValue}:`} // HACK: that way, the edit button will always be shown
                                    className="text-xs text-muted-foreground"
                                    onSelect={() => setOpenDialog(true)}
                                >
                                    <div className={cn("mr-2 h-4 w-4")} />
                                    <Edit2 className="mr-2 h-2.5 w-2.5" />
                                    Edit Labels
                                </CommandItem>
                            </CommandGroup> */}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <Dialog
                open={openDialog}
                onOpenChange={(open) => {
                    if (!open) {
                        setOpenCombobox(true);
                    }
                    setOpenDialog(open);
                }}
            >
                <DialogContent className="flex max-h-[90vh] flex-col">
                    <DialogHeader>
                        <DialogTitle>Edit Labels</DialogTitle>
                        <DialogDescription>
                            Change the label names or delete the labels. Create a label
                            through the combobox though.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="-mx-6 flex-1 overflow-scroll px-6 py-2">
                        {frameworks.map((framework) => {
                            return (
                                <DialogListItem
                                    key={framework.value}
                                    onDelete={() => deleteFramework(framework)}
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const target = e.target as typeof e.target &
                                            Record<"name" | "color", { value: string }>;
                                        const newFramework = {
                                            value: target.name.value.toLowerCase(),
                                            label: target.name.value,
                                            color: target.color.value,
                                        };
                                        updateFramework(framework, newFramework);
                                    }}
                                    {...framework}
                                />
                            );
                        })}
                    </div>
                    <DialogFooter className="bg-opacity-40">
                        <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="relative mt-3 overflow-y-auto">
                {selectedValues.map(({ label, value, color }) => (
                    <Badge
                        key={value}
                        variant="outline"
                        style={badgeStyle(color ?? defaultColor)}
                        className="mb-2 mr-2"
                    >
                        {label}
                    </Badge>
                ))}
            </div>
        </div>
    );
}

const CommandItemCreate = ({
    inputValue,
    frameworks,
    onSelect,
}: {
    inputValue: string;
    frameworks: FancyBoxType[];
    onSelect: () => void;
}) => {
    const hasNoFramework = !frameworks
        .map(({ value }) => value)
        .includes(`${inputValue.toLowerCase()}`);

    const render = inputValue !== "" && hasNoFramework;

    if (!render) return null;

    // BUG: whenever a space is appended, the Create-Button will not be shown.
    return (
        <CommandItem
            key={`${inputValue}`}
            value={`${inputValue}`}
            className="text-xs text-muted-foreground"
            onSelect={onSelect}
        >
            <div className={cn("mr-2 h-4 w-4")} />
            Create new label &quot;{inputValue}&quot;
        </CommandItem>
    );
};

const DropdownListItem = ({
    frameworks,
    selectedValues,
    toggleFramework,
}: {
    frameworks: FancyBoxType[];
    selectedValues: FancyBoxType[];
    toggleFramework: (framework: FancyBoxType) => void;
}) => {
    return (
        frameworks.map((framework) => {
            const isActive = selectedValues.some(item => item.value === framework.value);
            return (
                <div key={framework.value}>

                    <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={() => toggleFramework(framework)}
                    >

                        <Check
                            className={cn(
                                "mr-2 h-4 w-4",
                                isActive ? "opacity-100" : "opacity-0",
                            )}
                        />
                        <div className="flex-1">{framework.label}</div>

                        {/* {
                                                framework.information && (
                                                    <div
                                                        className="flex justify-center items-center h-6 w-6 rounded-full bg-slate-200"
                                                    >
                                                        <span className="text-[0.6rem]">{framework.information}</span>
                                                    </div>
                                                )
                                            } */}
                    </CommandItem>
                </div>

            );
        })
    )
}

const DialogListItem = ({
    value,
    label,
    color,
    onSubmit,
    onDelete,
}: FancyBoxType & {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onDelete: () => void;
}) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [accordionValue, setAccordionValue] = React.useState<string>("");
    const [inputValue, setInputValue] = React.useState<string>(label);
    const [colorValue, setColorValue] = React.useState<string>(color ?? defaultColor);
    const disabled = label === inputValue && color === colorValue;

    React.useEffect(() => {
        if (accordionValue !== "") {
            inputRef.current?.focus();
        }
    }, [accordionValue]);

    return (
        <Accordion
            key={value}
            type="single"
            collapsible
            value={accordionValue}
            onValueChange={setAccordionValue}
        >
            <AccordionItem value={value}>
                <div className="flex items-center justify-between">
                    <div>
                        <Badge variant="outline" style={badgeStyle(color ?? defaultColor)}>
                            {label}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                        <AccordionTrigger>Edit</AccordionTrigger>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                {/* REMINDER: size="xs" */}
                                <Button variant="destructive" size="sm">
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        You are about to delete the label{" "}
                                        <Badge variant="outline" style={badgeStyle(color ?? defaultColor)}>
                                            {label}
                                        </Badge>{" "}
                                        .
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={onDelete}>
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
                <AccordionContent>
                    <form
                        className="flex items-end gap-4"
                        onSubmit={(e) => {
                            onSubmit(e);
                            setAccordionValue("");
                        }}
                    >
                        <div className="grid w-full gap-3">
                            <Label htmlFor="name">Label name</Label>
                            <Input
                                ref={inputRef}
                                id="name"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="h-8"
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="color">Color</Label>
                            <Input
                                id="color"
                                type="color"
                                value={colorValue}
                                onChange={(e) => setColorValue(e.target.value)}
                                className="h-8 px-2 py-1"
                            />
                        </div>
                        {/* REMINDER: size="xs" */}
                        <Button type="submit" disabled={disabled} size="sm">
                            Save
                        </Button>
                    </form>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};