import { useDeleteUniversityMajorMutation } from "@/api/university/query";
import { getAdmissionMethodLabel, UniversityMajor } from "@/api/university/type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUniversityMajorStore } from "@/stores/use-university";
import { IconBriefcase } from "@tabler/icons-react";
import { Book, BookOpen, BrainCircuit, ChevronDown, Edit, GraduationCap, Lightbulb, MoreVertical, ScrollText, Trash2, Users } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const Alert = dynamic(
    () =>
        import("@/components/core/commons/modals/alert-modal").then(
            (mod) => mod.AlertModal
        ),
    { ssr: false }
);

interface UniversityMajorCardProps {
    data?: UniversityMajor[];
}

export const UniversityMajorCard = ({ data }: UniversityMajorCardProps) => {
    const [expandedCard, setExpandedCard] = useState<string | null>(null)
    const { mutate: deleteUniversityMajor, isPending } = useDeleteUniversityMajorMutation();
    const openEdit = useUniversityMajorStore((s) => s.openEdit);
    const [openAlert, setOpenAlert] = useState<boolean>(false);

    return (

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {
                data?.map((program) => (
                    <div key={program.id}>
                        <Alert
                            isOpen={openAlert}
                            onClose={() => setOpenAlert(false)}
                            onConfirm={() => deleteUniversityMajor({ universityMajorId: program.id! })}
                            loading={isPending}
                        />
                        <Card key={program.id} className="relative overflow-hidden">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <CardTitle className="flex items-center gap-2">
                                            <IconBriefcase className="h-5 w-5" />
                                            {program.major?.name}
                                        </CardTitle>
                                        <CardDescription>
                                            Code: {program.major?.majorCode} | {program.uniCode}
                                        </CardDescription>
                                    </div>
                                    <div className="flex gap-1">
                                        <Badge variant="secondary">{program.degreeLevel}</Badge>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    className="gap-2"
                                                    onClick={() => openEdit(program)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-destructive gap-2"
                                                    onClick={() => setOpenAlert(true)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <Book className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                                        <p className="text-sm">{program.major?.description}</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Lightbulb className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                                        <p className="text-sm">
                                            <span className="font-medium">Skills:</span>{" "}
                                            {program.major?.skillYouLearn}
                                        </p>
                                    </div>
                                </div>

                                <Collapsible
                                    open={expandedCard === program.id}
                                >
                                    <CollapsibleTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-between"
                                            onClick={() =>
                                                setExpandedCard(expandedCard === program.id ? null : program.id!)
                                            }
                                        >
                                            View Details
                                            <ChevronDown
                                                className={`h-4 w-4 transition-transform ${expandedCard === program.id ? "rotate-180" : ""
                                                    }`}
                                            />

                                        </Button>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="space-y-2">
                                        <div className="space-y-4 pt-2">
                                            <div className="grid gap-2">
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium">Category:</span>
                                                    <span className="text-sm">
                                                        {program.major?.majorCategory.name}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <BrainCircuit className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium">MBTI Types:</span>
                                                    <div className="flex gap-1">
                                                        {program.major?.majorCategory.mbtiTypes.map(
                                                            (type) => (
                                                                <Badge key={type} variant="outline">
                                                                    {type}
                                                                </Badge>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <ScrollText className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium">Holland Traits:</span>
                                                    <div className="flex gap-1">
                                                        <Badge variant="outline">
                                                            {program.major?.majorCategory.primaryHollandTrait}
                                                        </Badge>
                                                        <Badge variant="outline">
                                                            {
                                                                program.major?.majorCategory
                                                                    .secondaryHollandTrait
                                                            }
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium">
                                                        Admission Method:
                                                    </span>
                                                    <span className="text-sm">
                                                        {getAdmissionMethodLabel(program.admissionMethod)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium">Quota:</span>
                                                    <span className="text-sm">{program.quota} students</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            </CardContent>
                        </Card>
                    </div>
                ))
            }
        </div>



    )
}