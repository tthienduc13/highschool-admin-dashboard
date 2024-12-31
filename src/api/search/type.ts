export type Flashcard = {
    id: string;
    userId: string;
    subjectId: string;
    flashcardName: string;
    slug: string;
    flashcardDescription: string;
    status: StudySetVisibility;
    like: number;
    star: number;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    numberOfFlashcardContent: number;
};

export enum StudySetVisibility {
    Public = "Open",
    Private = "Hidden",
    Unlisted = "Link",
    Closed = "Closed",
}

export enum SearchType {
    All = "",
    Document = "document",
    Flashcard = "flashcard",
    Subject = "subject",
}
