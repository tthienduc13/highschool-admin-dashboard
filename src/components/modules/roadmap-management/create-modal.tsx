import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import BaseSelect, { OptionType } from "@/components/ui/multi-select";
import { MultiValue } from "react-select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { IconLoader2 } from "@tabler/icons-react";
import { useDebounceValue } from "@/hooks/use-debounce-value";
import { usePublishedQuery } from "@/api/course-curriculum/query";
import { useDocumentQuery } from "@/api/document/query";
import { Document } from "@/api/document/type";
import { useCreateRoadmapMutation } from "@/api/roadmap/mutation";

interface CreateRoadmapModalProps {
    open: boolean;
    onClose: () => void;
}

enum TypeExam {
    T1H = "T1H",
    FIE = "FIE",
    NHE = "NHE",
    CAP = "CAP",
}

export const CreateRoadmapModal = ({
    open,
    onClose,
}: CreateRoadmapModalProps) => {
    const { mutate: createRoadmap, isPending } = useCreateRoadmapMutation();

    const [roadmapTitle, setRoadmapTitle] = useState<string>("");
    const [roadmapDescription, setRoadmapDescription] = useState<string>("");

    const [subjectQuery, setSubjectQuery] = useState<string>("");
    const [selectedSubjects, setSelectedSubjects] = useState<
        MultiValue<OptionType>
    >([]);
    const debouncedSubjectQuery = useDebounceValue(subjectQuery, 500);

    const [documentQuery, setDocumentQuery] = useState<string>("");
    const [selectedDocuments, setSelectedDocuments] = useState<
        MultiValue<OptionType>
    >([]);
    const debouncedDocumentQuery = useDebounceValue(documentQuery, 500);

    const [selectedExamTypes, setSelectedExamTypes] = useState<
        MultiValue<OptionType>
    >([]);

    const { data: subjectData } = usePublishedQuery({
        search: debouncedSubjectQuery,
        pageNumber: 1,
        pageSize: 100,
    });
    const { data: documentData } = useDocumentQuery({
        seach: debouncedDocumentQuery,
        pageNumber: 1,
        pageSize: 100,
    });

    const documentOptions: OptionType[] =
        documentData?.data.map((document: Document) => ({
            label: document.documentName,
            value: document.id,
        })) || [];

    const subjectOptions: OptionType[] =
        subjectData?.data.map((subject) => ({
            label: subject.subjectName,
            value: subject.subjectId,
        })) || [];

    const examTypeOptions: OptionType[] = Object.entries(TypeExam).map(
        ([, value]) => ({
            label: value,
            value: value.toLowerCase(),
        })
    );

    const handleSubjectChange = (selected: MultiValue<OptionType>) => {
        setSelectedSubjects(selected);
    };

    const handleDocumentChange = (selected: MultiValue<OptionType>) => {
        setSelectedDocuments(selected);
    };

    const handleExamTypeChange = (selected: MultiValue<OptionType>) => {
        setSelectedExamTypes(selected);
    };

    const isCreateButtonDisabled =
        !roadmapTitle ||
        !roadmapDescription ||
        selectedSubjects.length === 0 ||
        selectedExamTypes.length === 0 ||
        selectedDocuments.length === 0;

    const handleCreate = () => {
        createRoadmap({
            roadmapName: roadmapTitle,
            roadmapDescription: roadmapDescription,
            roadmapSubjectIds: selectedSubjects.map(
                (subject) => subject.value as string
            ),
            roadmapDocumentIds: selectedDocuments.map(
                (document) => document.value as string
            ),
            typeExam: selectedExamTypes.map(
                (examType) => examType.value as string
            ),
        });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader aria-description={undefined}>
                    <DialogTitle className="text-2xl font-bold">
                        Create Roadmap
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-y-2">
                    <div className="text-lg font-semibold">Title</div>
                    <Input
                        placeholder="Enter roadmap title"
                        value={roadmapTitle}
                        onChange={(e) => setRoadmapTitle(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <div className="text-lg font-semibold">Description</div>
                    <Textarea
                        placeholder="Enter roadmap description"
                        value={roadmapDescription}
                        onChange={(e) => setRoadmapDescription(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-y-2">
                    <div className="text-lg font-semibold">Subjects</div>
                    <BaseSelect
                        options={subjectOptions}
                        placeholder="Search and select subjects"
                        onInputChange={(value) => setSubjectQuery(value)} // Update the search query
                        onChange={handleSubjectChange} // Handle multiple selections
                        value={selectedSubjects} // Pass the selected subjects
                        isMulti // Enable multi-select
                        isClearable
                    />
                </div>

                <div className="flex flex-col gap-y-2">
                    <div className="text-lg font-semibold">Documents</div>
                    <BaseSelect
                        options={documentOptions}
                        placeholder="Search and select documents"
                        onInputChange={(value) => setDocumentQuery(value)}
                        onChange={handleDocumentChange}
                        value={selectedDocuments}
                        isMulti
                        isClearable
                    />
                </div>

                <div className="flex flex-col gap-y-2">
                    <div className="text-lg font-semibold">Exam Types</div>
                    <BaseSelect
                        options={examTypeOptions}
                        placeholder="Select exam types"
                        onChange={handleExamTypeChange}
                        value={selectedExamTypes}
                        isMulti
                        isClearable
                    />
                </div>
                <div className="mt-4 flex flex-row justify-end">
                    <Button
                        onClick={handleCreate}
                        disabled={isCreateButtonDisabled}
                    >
                        {isPending ? (
                            <IconLoader2 className="animate-spin" />
                        ) : (
                            "Create"
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
