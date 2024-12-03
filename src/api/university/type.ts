export type University = {
    id: string;
    uniCode: string;
    name: string;
    description: string;
    region: string;
    contactPhone: string;
    contactEmail: string;
    websiteLink: string;
}

export type UniversityCreate = {
    uniCode: string;
    name: string;
    description: string;
    region: string;
    contactPhone: string;
    contactEmail: string;
    websiteLink: string;
}

export enum AdmissionMethod {
    DGNL = "DGNL",
    THPTQG = "THPTQG",
    HighschoolTranscript = "HighschoolTranscript",
    Other = "Other",
}

export enum DegreeLevel {
    Vocational = "Vocational",
    Associate = "Associate",
    Bachelor = "Bachelor",
    Master = "Master",
    Doctorate = "Doctorate",
}

export const getAdmissionMethodLabel = (method: string) => {
    switch (method) {
        case AdmissionMethod.DGNL:
            return "Đánh Giá Năng Lực"
        case AdmissionMethod.THPTQG:
            return "Xét điểm thi tốt nghiệp"
        case AdmissionMethod.HighschoolTranscript:
            return "Xét điểm học bạ"
        case AdmissionMethod.Other:
            return "Khác"
        default:
            return method
    }
}

export const admissionMethods: Record<AdmissionMethod, string> = {
    [AdmissionMethod.DGNL]: "Đánh giá năng lực",
    [AdmissionMethod.THPTQG]: "Thi THPT Quốc gia",
    [AdmissionMethod.HighschoolTranscript]: "Học bạ THPT",
    [AdmissionMethod.Other]: "Khác",
};

export const degreeLevels: Record<DegreeLevel, string> = {
    [DegreeLevel.Vocational]: "Trung cấp",
    [DegreeLevel.Associate]: "Cao đẳng",
    [DegreeLevel.Bachelor]: "Đại học",
    [DegreeLevel.Master]: "Thạc sĩ",
    [DegreeLevel.Doctorate]: "Tiến sĩ",
}

interface MajorCategoryCode {
    id: string
    majorCategoryCode: string
    name: string
    mbtiTypes: string[]
    primaryHollandTrait: string
    secondaryHollandTrait: string
}

interface MajorCode {
    id: string
    majorCode: string
    name: string
    description: string
    skillYouLearn: string
    majorCategoryCode: string
    majorCategory: MajorCategoryCode
}

export interface UniversityMajor {
    id?: string | null;
    uniCode: string;
    majorCode: string;
    admissionMethod: string;
    quota: number;
    degreeLevel: string;
    major?: MajorCode;
}