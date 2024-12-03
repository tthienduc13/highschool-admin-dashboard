import { useGetMajorNameQuery } from "@/api/major/query";
import { useCreateUniversityMajorListMutation, useUpdateUniversityMajorMutation } from "@/api/university/query";
import { admissionMethods, degreeLevels } from "@/api/university/type";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useUniversityMajorStore } from "@/stores/use-university";
import { IconLoader2 } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

interface UniversityMajorActionProps {
    mode: "create" | "edit";
    uniCode: string;
}

export const UniversityMajorAction = ({ mode, uniCode }: UniversityMajorActionProps) => {
    const { toast } = useToast();

    const { mutate: createUniversityMajorList, isPending: isCreating } = useCreateUniversityMajorListMutation();
    const { mutate: updateUniversity, isPending: isUpdating } = useUpdateUniversityMajorMutation();

    const { data: majorNames, isPending: isMajorLoading } = useGetMajorNameQuery({
        pageNumber: -1,
        pageSize: 10
    });

    const [majorCode, setMajorCode] = useState<string>("");
    const [quota, setQuota] = useState<number>(0);
    const [admissionMethod, setAdmissionMethod] = useState<string>("");
    const [degreeLevel, setDegreeLevel] = useState<string>("");

    const closeCreate = useUniversityMajorStore((s) => s.closeCreate);
    const closeEdit = useUniversityMajorStore((s) => s.closeEdit);
    const universityMajor = useUniversityMajorStore((s) => s.editUniversityMajor);

    const isDisabled = isCreating || isUpdating;;

    const resetField = () => {
        setMajorCode("");
        setQuota(0);
        setAdmissionMethod("");
        setDegreeLevel("");
    }

    const validationFields = () => {
        if (!majorCode || !quota || !admissionMethod || !degreeLevel) {
            toast({
                title: "Error",
                description: "Please fill all required fields",
                variant: "destructive"
            });
            return false;
        }

        if (quota < 0) {
            toast({
                title: "Error",
                description: "Quota must be greater or equal than 0",
                variant: "destructive"
            })

            return false;
        }

        return true;
    }

    const handleSaveUniversityMajor = () => {
        if (!validationFields()) {
            return;
        }

        try {
            if (mode === "create") {
                createUniversityMajorList({
                    universityMajorList: [{
                        uniCode: uniCode,
                        majorCode: majorCode,
                        admissionMethod: admissionMethod,
                        quota: quota,
                        degreeLevel: degreeLevel
                    }]
                });
            } else if (mode === "edit") {
                updateUniversity({
                    universityMajor: {
                        id: universityMajor?.id,
                        uniCode: uniCode,
                        majorCode: majorCode,
                        admissionMethod: admissionMethod,
                        quota: quota,
                        degreeLevel: degreeLevel
                    }
                });
            }

            resetField()
            closeCreate()
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
                            onClick={handleSaveUniversityMajor}
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
                            Major
                            {" "}
                            <span className="text-primary">
                                (required)
                            </span>
                        </Label>
                        <Combobox
                            items={majorNames?.data.map(item => ({
                                label: item.name,
                                value: item.majorCode
                            })) ?? []}
                            value={majorCode}
                            setValue={setMajorCode}
                            placeHolder="Select Major"
                            className="w-full"
                            disabled={isMajorLoading}
                        />
                    </div>
                    <div>
                        <Label className="text-sm font-semibold">
                            Quota
                            {" "}
                            <span className="text-primary">
                                (required)
                            </span>
                        </Label>
                        <Input
                            type="text"
                            placeholder="Quota"
                            value={quota}
                            onChange={(e) => setQuota(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <Label className="text-sm font-semibold">
                            Admission Method
                            {" "}
                            <span className="text-primary">
                                (required)
                            </span>
                        </Label>
                        <Select
                            onValueChange={(value) =>
                                setAdmissionMethod(value)
                            }
                            value={admissionMethod}
                        >
                            <SelectTrigger className="mr-4 rounded-lg border-2 bg-background text-left">
                                <SelectValue
                                    placeholder="Select your method"
                                    className="px-4"
                                />
                            </SelectTrigger>
                            <SelectContent
                                onCloseAutoFocus={(e) =>
                                    e.preventDefault()
                                }
                                className="h-[25vh] overflow-y-auto placeholder:text-muted-foreground"
                            >
                                {Object.entries(admissionMethods)?.map(([key, value]) => (
                                    <SelectItem
                                        key={key}
                                        value={key}
                                    >
                                        {value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label className="text-sm font-semibold">
                            Degree Level
                            {" "}
                            <span className="text-primary">
                                (required)
                            </span>
                        </Label>
                        <Select
                            onValueChange={(value) =>
                                setDegreeLevel(value)
                            }
                            value={degreeLevel}
                        >
                            <SelectTrigger className="mr-4 rounded-lg border-2 bg-background text-left">
                                <SelectValue
                                    placeholder="Select your level"
                                    className="px-4"
                                />
                            </SelectTrigger>
                            <SelectContent
                                onCloseAutoFocus={(e) =>
                                    e.preventDefault()
                                }
                                className="h-[25vh] overflow-y-auto placeholder:text-muted-foreground"
                            >
                                {Object.entries(degreeLevels)?.map(([key, value]) => (
                                    <SelectItem
                                        key={key}
                                        value={key}
                                    >
                                        {value}
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