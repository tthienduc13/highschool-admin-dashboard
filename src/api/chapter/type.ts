export type Chapter = {
    id: string;
    chapterName: string;
    chapterLevel: number;
    description: string;
    subjectId: string;
    curriculumName: string;
    semester: number;
    numberLesson: number;
    createdAt: Date;
    updatedAt: Date;
};

export type NewChapterData = {
    chapterName: string;
    chapterLevel: number;
    description: string;
    semester: number;
};
