export type Course = {
    id: string;
    subjectName: string;
    image: string;
    information: string;
    subjectDescription: string;
    subjectCode: string;
    createdAt: Date;
    categoryName: Class;
    updatedAt: Date;
    slug: string;
    like: number;
    view: number;
    numberEnrollment: null;
};

export type EditCoursePayload = {
    id: string;
    image: string;
    subjectName: string;
    imageRaw: File | null;
    categoryId: string;
    subjectCode: string;
    subjectDescription: string;
    information: string;
};

export enum Class {
    Class10 = "10",
    Class11 = "11",
    Class12 = "12",
}
