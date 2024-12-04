import { useDeleteDocumentMutation } from "@/api/document/query"
import { Document } from "@/api/document/type"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Eye, ThumbsUp } from "lucide-react"
import dynamic from "next/dynamic"
import { useState } from "react"

const Alert = dynamic(
    () =>
        import("@/components/core/commons/modals/alert-modal").then(
            (mod) => mod.AlertModal
        ),
    { ssr: false }
);

export const DocumentCard = ({ documents }: { documents: Document[] }) => {
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const { mutate: deleteDocument, isPending } = useDeleteDocumentMutation();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {documents.map((doc) => (
                <div key={doc.id}>
                    <Alert
                        isOpen={openAlert}
                        onClose={() => setOpenAlert(false)}
                        onConfirm={() => deleteDocument(doc.id)}
                        loading={isPending}
                    />
                    <Card key={doc.id} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>{doc.documentName}</CardTitle>
                            <CardDescription>{doc.documentDescription}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <div className="space-y-2">
                                <p><strong>Subject:</strong> {doc.subjectCurriculum.subjectName}</p>
                                <p><strong>Curriculum:</strong> {doc.subjectCurriculum.curriculumName}</p>
                                <p><strong>Category:</strong> {doc.category.categoryName}</p>
                                <p><strong>Year:</strong> {doc.documentYear}</p>
                                <p><strong>Semester:</strong> {doc.semester}</p>
                                {doc.schoolName && <p><strong>School:</strong> {doc.schoolName}</p>}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <Eye size={16} /> <span>{doc.view}</span>
                                <Download size={16} /> <span>{doc.download}</span>
                                <ThumbsUp size={16} /> <span>{doc.like}</span>
                            </div>
                            <div className="flex gap-1">
                                <Button variant="default" size="sm">Update</Button>
                                <Button
                                    variant="destructive" size="sm"
                                    onClick={() => setOpenAlert(true)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            ))}
        </div>
    )
}