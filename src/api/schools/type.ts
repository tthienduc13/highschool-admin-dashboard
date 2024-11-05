export type School = {
    id: string;
    schoolName: string;
    provinceId: string;
    numberDocuments: string;
};

export type CreateSchoolData = {
    provinceId: number;
    schoolName: string;
    locationDetail: string;
};
