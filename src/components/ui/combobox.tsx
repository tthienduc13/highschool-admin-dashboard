"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export interface ComboboxType {
    value: string;
    label: string;
}

interface ComboboxProps {
    items: ComboboxType[];
    value?: string;
    setValue: (value: string) => void;
    className?: string;
    placeHolder?: string;
    disabled?: boolean;
}

export function Combobox({ items, value, setValue, className, placeHolder, disabled }: ComboboxProps) {
    const [open, setOpen] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState(value);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`${className} justify-between`}
                    disabled={disabled ?? false}
                >
                    {value
                        ? items.find((item) => item.label === selectedValue)?.label
                        : (placeHolder ?? "Select value")}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={`${className} p-0`}>
                <Command>
                    <CommandInput placeholder="Search data..." />
                    <CommandList>
                        <CommandEmpty>No data found.</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.label}
                                    onSelect={(currentValue) => {
                                        setSelectedValue(currentValue === selectedValue ? "" : currentValue)
                                        setOpen(false)
                                        setValue(item.value)
                                    }}
                                >
                                    {item.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            selectedValue === item.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
