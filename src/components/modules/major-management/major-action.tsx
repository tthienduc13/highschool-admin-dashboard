import { useCreateMajorMutation, useGetMajorCategoryNameQuery, useUpdateMajorMutation } from "@/api/major/query";
import { useMajorStore } from "@/stores/use-major";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { IconLoader2 } from "@tabler/icons-react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface MajorActionProps {
    mode: "create" | "edit";
}

export const MajorAction = ({ mode }: MajorActionProps) => {
    const { mutate: createMajor, isPending: isCreating } = useCreateMajorMutation();
    const { mutate: updateMajor, isPending: isUpdating } = useUpdateMajorMutation();
    const { data: majorCategories, isPending: isMajorCategoryLoading } = useGetMajorCategoryNameQuery({
        pageNumber: -1,
        pageSize: 10,
        search: "",
    });

    const major = useMajorStore((s) => s.editMajor);
    const { toast } = useToast();

    const [majorCategoryCode, setMajorCategoryCode] = useState<string>(major?.majorCategoryCode ?? "");
    const [majorCode, setMajorCode] = useState<string>(major?.majorCode ?? "");
    const [name, setName] = useState<string>(major?.name ?? "");
    const [description, setDescription] = useState<string>(major?.description ?? "");
    const [skillYouLearn, setSkillYouLearn] = useState<string>(major?.skillYouLearn ?? "");

    const closeCreate = useMajorStore((s) => s.closeCreate);
    const closeEdit = useMajorStore((s) => s.closeEdit);

    const isDisabled = isCreating || isUpdating;

    const validationFields = () => {
        if (!majorCode || !name || !description || !skillYouLearn || !majorCategoryCode) {
            toast({
                title: "Some errors occurred",
                description: "Please fill all required fields",
                variant: "destructive",
            });

            return false;
        }

        if (name.length <= 5) {
            toast({
                title: "Some errors occurred",
                description: "Name must be at least 5 characters",
                variant: "destructive",
            });

            return false;
        }

        if (description.length <= 10) {
            toast({
                title: "Some errors occurred",
                description: "Description must be at least 10 characters",
                variant: "destructive",
            });

            return false;
        }

        return true;
    }

    const resetField = () => {
        setMajorCategoryCode("");
        setMajorCode("");
        setName("");
        setDescription("");
        setSkillYouLearn("");
    }

    const handleSave = () => {
        if (!validationFields()) {
            return;
        }

        try {
            if (mode === "create") {
                createMajor({
                    majors: [
                        {
                            name: name,
                            majorCode: majorCode,
                            description: description,
                            skillYouLearn: skillYouLearn,
                            majorCategoryCode: majorCategoryCode,
                        }
                    ]
                });
            } else if (mode === "edit") {
                updateMajor({
                    major: {
                        id: major?.id,
                        name: name,
                        majorCode: majorCode,
                        description: description,
                        skillYouLearn: skillYouLearn,
                        majorCategoryCode: majorCategoryCode,
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
                            onClick={handleSave}
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
                    <div>
                        <Label className="text-sm font-semibold">
                            Major Code
                            {" "}
                            <span className="text-primary">
                                (required)
                            </span>
                        </Label>
                        <Input
                            type="text"
                            placeholder="Major Code"
                            value={majorCode}
                            onChange={(e) => setMajorCode(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label className="text-sm font-semibold">
                            Name
                            {" "}
                            <span className="text-primary">
                                (required)
                            </span>
                        </Label>
                        <Input
                            type="text"
                            placeholder="Major Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label className="text-sm font-semibold">
                            Description
                            {" "}
                            <span className="text-primary">
                                (required)
                            </span>
                        </Label>
                        <Textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label className="text-sm font-semibold">
                            Skill You Learn
                            {" "}
                            <span className="text-primary">
                                (required)
                            </span>
                        </Label>
                        <Textarea
                            placeholder="Skill You Learn"
                            value={skillYouLearn}
                            onChange={(e) => setSkillYouLearn(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label className="text-sm font-semibold">
                            Major Category
                            {" "}
                            <span className="text-primary">
                                (required)
                            </span>
                        </Label>
                        <Select
                            disabled={isMajorCategoryLoading}
                            value={majorCategoryCode}
                            onValueChange={setMajorCategoryCode}
                        >
                            <SelectTrigger className="mr-4 rounded-lg border-2 bg-background text-left">
                                <SelectValue
                                    placeholder="Select major category"
                                    className="px-4"
                                />
                            </SelectTrigger>
                            <SelectContent
                                onCloseAutoFocus={(e) =>
                                    e.preventDefault()
                                }
                                className="h-[50vh] overflow-y-auto placeholder:text-muted-foreground"
                            >
                                {majorCategories?.data.map((majorCategory) => (
                                    <SelectItem
                                        key={majorCategory.majorCategoryCode}
                                        value={majorCategory.majorCategoryCode}
                                    >
                                        {majorCategory.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}