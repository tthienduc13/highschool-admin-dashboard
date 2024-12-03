export type CreatePayload = {
    documentName: string;
    documentDescription: string;
    schoolId: string;
    curriculumId: string;
    subjectId: string;
    semester: number;
    documentYear: number;
};

export type Document = {
    id: string
    documentName: string
    documentDescription: string
    documentYear: number
    view: number
    download: number
    schoolName: string | null
    isLike: boolean
    like: number
    subjectCurriculum: {
        subjectName: string
        curriculumName: string
    }
    category: {
        categoryName: string
    }
    semester: number
    createdAt: string
    updatedAt: string
}