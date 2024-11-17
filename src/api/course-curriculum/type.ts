export type CreatePayload = {
    subjectId: string;
    curriculumId: string;
    subjectCurriculumName: string;
};

export type CreateResponse = {
    subjectCurriculumId: string;
    subjectId: string;
    curriculumId: string;
};

export type CourseCurriculum = {
    subjectCurriculumId: string;
    subjectCurriculumName: string;
    subjectName: string;
    subjectId: string;
    curriculumName: string;
    curriculumId: string;
};
