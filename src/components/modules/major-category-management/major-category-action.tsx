import { useCreateMajorCategoryMutation, useUpdateMajorCategoryMutation } from "@/api/major/query";
import { HollandTrait, MBTIType } from "@/api/major/type";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { FancyBox, FancyBoxType } from "@/components/ui/fancy-box";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { getRandomHexColor } from "@/lib/utils";
import { useMajorCategoryStore } from "@/stores/use-major";
import { IconLoader2 } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

interface MajorCategoryActionProps {
    mode: "create" | "edit";
}

export const MajorCategoryAction = ({ mode }: MajorCategoryActionProps) => {
    const { toast } = useToast();

    const { mutate: createMajorCategory, isPending: isCreating } = useCreateMajorCategoryMutation();
    const { mutate: updateMajorCategory, isPending: isUpdating } = useUpdateMajorCategoryMutation();

    const closeCreate = useMajorCategoryStore((s) => s.closeCreate);
    const closeEdit = useMajorCategoryStore((s) => s.closeEdit);
    const majorCategory = useMajorCategoryStore((s) => s.editMajorCategory);

    const [mbtiTypes, setMBTITypes] = useState<FancyBoxType[]>(majorCategory?.mbtiTypes.map(mbti => {
        return {
            label: mbti,
            value: mbti,
            color: getRandomHexColor()
        }
    }) ?? []);
    const [majorCategoryCode, setMajorCategoryCode] = useState<string>(majorCategory?.majorCategoryCode ?? "");
    const [name, setName] = useState<string>(majorCategory?.name ?? "");
    const [primaryHollandTrait, setPrimaryHollandTrait] = useState<string>(majorCategory?.primaryHollandTrait ?? "");
    const [secondaryHollandTrait, setSecondaryHollandTrait] = useState<string>(majorCategory?.secondaryHollandTrait ?? "");

    const isDisabled = isCreating || isUpdating;

    const resetField = () => {
        setMajorCategoryCode("");
        setName("");
        setMBTITypes([]);
        setPrimaryHollandTrait("");
        setSecondaryHollandTrait("");
    }

    const validationFields = () => {
        if (!majorCategoryCode || !name || mbtiTypes.length === 0 || !primaryHollandTrait || !secondaryHollandTrait) {
            toast({
                title: "Some errors occurred",
                description: "Please fill all required fields",
                variant: "destructive",
            });

            return false;
        }

        if (name.length < 3) {
            toast({
                title: "Some errors occurred",
                description: "Name must be at least 3 characters",
                variant: "destructive",
            });

            return false;
        }

        return true;
    }

    const handleSubmit = () => {
        if (!validationFields()) {
            return;
        }

        try {
            if (mode === "create") {
                createMajorCategory({
                    majorCategories: [
                        {
                            majorCategoryCode,
                            name,
                            mbtiTypes: mbtiTypes.map(({ value }) => value),
                            primaryHollandTrait,
                            secondaryHollandTrait
                        }
                    ]
                });
            } else {
                updateMajorCategory({
                    majorCategory: {
                        id: majorCategory?.id,
                        majorCategoryCode,
                        name,
                        mbtiTypes: mbtiTypes.map(({ value }) => value),
                        primaryHollandTrait,
                        secondaryHollandTrait
                    }
                });
            }

            resetField();
            closeCreate();

        } catch {
            return;
        }
    }

    return (
        <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "35%", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-full flex rounded-lg flex-col gap-4 overflow-auto"
        >
            <div className="bg-background  p-4 flex flex-col gap-4">
                <div className="w-full flex flex-row items-center justify-between">
                    <h2 className="text-lg font-semibold">Create University</h2>
                    <div className="flex flex-row gap-2">
                        <Button
                            disabled={isDisabled}
                            onClick={handleSubmit}
                        >
                            {isCreating ? (
                                <IconLoader2 className="animate-spin" />
                            ) : mode === "create" ? (
                                "Create"
                            ) : (
                                "Update"
                            )}
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={
                                mode === "create" ? closeCreate : closeEdit
                            }
                        >
                            <X />
                        </Button>
                    </div>
                </div>
                <div className="space-y-5 px-1 w-full ">
                    <div className="flex flex-col gap-2">
                        <Label className="text-sm font-semibold">
                            Major Category Code
                            {" "}
                            <span className="text-primary">
                                (required)
                            </span>
                        </Label>
                        <Input
                            type="text"
                            placeholder="Major Category Code"
                            value={majorCategoryCode}
                            onChange={(e) => setMajorCategoryCode(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className="text-sm font-semibold">
                            Name
                            {" "}
                            <span className="text-primary">
                                (required)
                            </span>
                        </Label>
                        <Input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className="text-sm font-semibold">
                            MBTI Types
                            {" "}
                            <span className="text-primary">
                                (required)
                            </span>
                        </Label>
                        <FancyBox
                            items=
                            {Object.values(MBTIType).map(value => ({
                                label: value, // You can customize the label as needed
                                value,
                                color: getRandomHexColor()
                            }))}
                            setSelectedValues={setMBTITypes}
                            selectedValues={mbtiTypes}
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm font-semibold">
                                Primary Holland Trait
                                {" "}
                                <span className="text-primary">
                                    (required)
                                </span>
                            </Label>
                            <Combobox
                                items={Object.values(HollandTrait).map(value => ({
                                    label: value,
                                    value
                                })) ?? []}
                                value={primaryHollandTrait}
                                setValue={setPrimaryHollandTrait}
                                placeHolder="Select Major"
                                className="w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm font-semibold">
                                Secondary Holland Trait
                                {" "}
                                <span className="text-primary">
                                    (required)
                                </span>
                            </Label>
                            <Combobox
                                items={Object.values(HollandTrait).map(value => ({
                                    label: value,
                                    value
                                })) ?? []}
                                value={secondaryHollandTrait}
                                setValue={setSecondaryHollandTrait}
                                placeHolder="Select Major"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}