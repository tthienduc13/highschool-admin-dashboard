export type Major = {
    id?: string;
    majorCode: string;
    name: string;
    description: string;
    skillYouLearn: string;
    majorCategoryCode: string;
    majorCategory?: MajorCategory;
}

export type MajorCategory = {
    id?: string;
    majorCategoryCode: string;
    name: string;
    mbtiTypes: string[];
    primaryHollandTrait: string;
    secondaryHollandTrait: string;
}

export enum MBTIType {
    INTJ = "INTJ",
    INTP = "INTP",
    ENTJ = "ENTJ",
    ENTP = "ENTP",
    INFJ = "INFJ",
    INFP = "INFP",
    ENFJ = "ENFJ",
    ENFP = "ENFP",
    ISTJ = "ISTJ",
    ISFJ = "ISFJ",
    ESTJ = "ESTJ",
    ESFJ = "ESFJ",
    ISTP = "ISTP",
    ISFP = "ISFP",
    ESTP = "ESTP",
    ESFP = "ESFP",
}

export const MBTIDictionary: string[] = [
    "I: Introverted",
    "E: Extraverted",
    "N: Intuitive",
    "S: Sensing",
    "T: Thinking",
    "F: Feeling",
    "J: Judging",
    "P: Perceiving"
]

export enum HollandTrait {
    Realistic = "Realistic",
    Investigative = "Investigative",
    Artistic = "Artistic",
    Social = "Social",
    Enterprising = "Enterprising",
    Conventional = "Conventional",
}