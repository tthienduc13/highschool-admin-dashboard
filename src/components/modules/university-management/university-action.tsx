import { useQueryCountry } from "@/api/external/country/country.query";
import { useCreateUniversityListMutation, useUpdateUniversityMutation } from "@/api/university/query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUniversityStore } from "@/stores/use-university";
import { IconLoader2 } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

interface UniversityActionProps {
    mode: "create" | "edit";
}

export const UniversityAction = ({ mode }: UniversityActionProps) => {
    const { mutate: createUniversityList, isPending: isCreating } = useCreateUniversityListMutation();
    const { mutate: updateUniversity, isPending: isUpdating } = useUpdateUniversityMutation();

    const closeCreate = useUniversityStore((s) => s.closeCreate);
    const closeEdit = useUniversityStore((s) => s.closeEdit);
    const university = useUniversityStore((s) => s.editUniversity);

    const isDisabled = isCreating || isUpdating;;

    const [uniCode, setUniCode] = useState(university?.uniCode || "");
    const [name, setName] = useState(university?.name || "");
    const [description, setDescription] = useState(university?.description || "");
    const [contactPhone, setContactPhone] = useState(university?.contactPhone || "");
    const [contactEmail, setContactEmail] = useState(university?.contactEmail || "");
    const [websiteLink, setWebsiteLink] = useState(university?.websiteLink || "");
    const [selectedProvince, setSelectedProvince] = useState<string>(university?.region || "");
    const { data: countries } = useQueryCountry();

    const resetField = () => {
        setName("");
        setDescription("");
        setSelectedProvince("");
        setContactPhone("");
        setContactEmail("");
        setWebsiteLink("");
    }

    const handleSaveUniversity = () => {
        try {
            if (mode === "edit") {
                updateUniversity({
                    id: university?.id || "",
                    contactEmail: contactEmail,
                    contactPhone: contactPhone,
                    description: description,
                    name: name,
                    region: selectedProvince,
                    websiteLink: websiteLink,
                    uniCode: uniCode
                })
                return;
            } else if (mode === "create") {
                createUniversityList([
                    {
                        uniCode,
                        name,
                        description,
                        region: selectedProvince,
                        contactPhone,
                        contactEmail,
                        websiteLink,
                    }])
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
                            onClick={handleSaveUniversity}
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
                            University Code
                            {" "}
                            <span className="text-primary">
                                (required)
                            </span>
                        </Label>
                        <Input
                            type="text"
                            placeholder="University Code"
                            value={uniCode}
                            onChange={(e) => setUniCode(e.target.value)}
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
                            placeholder="Name"
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
                            Region{" "}
                            <span className="text-primary">
                                (required)
                            </span>
                        </Label>
                        <Select
                            value={selectedProvince ?? ""}
                            onValueChange={setSelectedProvince}
                        >
                            <SelectTrigger className="mr-4 rounded-lg border-2 bg-background text-left">
                                <SelectValue
                                    placeholder="Select your province"
                                    className="px-4"
                                />
                            </SelectTrigger>
                            <SelectContent
                                onCloseAutoFocus={(e) =>
                                    e.preventDefault()
                                }
                                className="h-[50vh] overflow-y-auto placeholder:text-muted-foreground"
                            >
                                {countries?.map((country) => (
                                    <SelectItem
                                        key={country.code}
                                        value={country.name}
                                    >
                                        {country.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label className="text-sm font-semibold">
                            Contact Phone
                            {" "}
                            <span className="text-primary">
                                (required)
                            </span>
                        </Label>
                        <Input
                            type="text"
                            placeholder="Contact Phone"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label className="text-sm font-semibold">
                            Contact Email
                            {" "}
                            <span className="text-primary">
                                (required)
                            </span>
                        </Label>
                        <Input
                            type="text"
                            placeholder="Contact Email"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label className="text-sm font-semibold">
                            Website Link
                            {" "}
                            <span className="text-primary">
                                (required)
                            </span>
                        </Label>
                        <Input
                            type="text"
                            placeholder="Website Link"
                            value={websiteLink}
                            onChange={(e) => setWebsiteLink(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}