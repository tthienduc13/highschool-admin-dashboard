export type Chapter = {
    id: string;
    chapterName: string;
    chapterLevel: number;
    description: string;
    subjectId: string;
    numberLesson: number;
    createdAt: Date;
    updatedAt: Date;
};

export type NewChapterData = {
    chapterName: string;
    chapterLevel: number;
    description: string;
};
