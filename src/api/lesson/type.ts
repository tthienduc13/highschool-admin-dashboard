export type Lesson = {
    id: string;
    lessonName: string;
    chapterId: string;
    slug: string;
    like: null;
    videoUrl: null;
    createdAt: Date;
    quizCount: number;
    theoryCount: number;
    displayOrder: number;
};

export type NewLessonData = {
    lessonName: string;
    lessonMaterial: string;
    displayOrder: number;
};

export type LessonDetail = {
    id: string;
    lessonName: string;
    lessonMaterial: string;
    slug: string;
    like: null;
    videoUrl: null;
    chapterId: string;
    theoryCount: number;
    createdCount: Date;
    theories: TheoryPreview[];
    displayOrder: number;
    quizCount: number;
};

export type TheoryPreview = {
    theoryId: string;
    theoryName: string;
};
