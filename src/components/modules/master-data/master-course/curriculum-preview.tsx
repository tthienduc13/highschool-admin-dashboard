import { useCurriculumMutation, useCurriculumQuery } from "@/api/curriculum/query";
import { Curriculum } from "@/api/curriculum/type";
import { DataTable } from "@/components/core/commons/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDebounceValue } from "@/hooks/use-debounce-value";
import { useToast } from "@/hooks/use-toast";
import { IconSearch } from "@tabler/icons-react";
import { PaginationState } from "@tanstack/react-table";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";


export const CiriculumPreview = () => {
    const [open, setOpen] = useState(false);
    const { data: curriculums, isLoading: curriculumLoading } =
        useCurriculumQuery();
    const { mutate: createCurriculum, isPending: isCreateLoading } = useCurriculumMutation();
    const [curriculumName, setCurriculumName] = useState<string>("");
    const { toast } = useToast();

    const onOpenChange = () => {
        setOpen(!open);
    }

    const onSave = () => {
        console.log("okok: ", curriculumName)
        if (!curriculumName) return;
        else if (curriculumName.length < 3) {
            toast({
                title: "Some error occured",
                variant: "destructive",
                description: "Curriculum name must be at least 3 characters"
            })
            return;
        }
        else if (curriculums?.find(curriculum => curriculum.curriculumName === curriculumName)) {
            toast({
                title: "Some error occured",
                variant: "destructive",
                description: "Curriculum name already exists"
            })
            return;
        }

        createCurriculum(curriculumName);
    }

    return (
        <>
            <Button onClick={onOpenChange}>
                Preview Curriculum
            </Button>
            <div>
                <Dialog open={open} onOpenChange={onOpenChange}>
                    <DialogContent
                        aria-describedby={undefined}
                        className="rounded-xl px-10"
                    >
                        <DialogTitle className="text-start text-2xl md:text-3xl flex justify-between">
                            <p> Curriculums ({curriculums?.length})</p>
                            <div className="flex">
                                <Input onChange={(e) => setCurriculumName(e.target.value)} />
                                <Button className="ml-1" onClick={onSave}>Save</Button>
                            </div>
                        </DialogTitle>
                        <div className="flex flex-col gap-y-6">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="font-bold w-[1vw]">No</TableHead>
                                        <TableHead className="flex font-bold justify-center items-center">Image</TableHead>
                                        <TableHead className="font-bold">Curriculum Name</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {curriculums?.map((curriculum, index) => (
                                        <TableRow key={curriculum.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell className="flex justify-center">
                                                <Image
                                                    src={`https://res.cloudinary.com/dhdyel6be/image/upload/v1732594163/HighSchool/logo/${curriculum.id}`}
                                                    width={80} height={80} alt="image"
                                                />
                                            </TableCell>
                                            <TableCell>{curriculum.curriculumName}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>

    )
}