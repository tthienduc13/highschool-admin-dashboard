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