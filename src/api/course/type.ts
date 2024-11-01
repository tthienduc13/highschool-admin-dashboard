export type Course = {
    id: string;
    subjectName: string;
    image: string;
    information: string;
    subjectDescription: string;
    subjectCode: string;
    numberOfChapters: number;
    createdAt: Date;
    categoryName: Class;
    updatedAt: Date;
    slug: string;
    like: null;
    view: number;
    numberEnrollment: number;
};

export enum Class {
    Class10 = "10",
    Class11 = "11",
    Class12 = "12",
}
