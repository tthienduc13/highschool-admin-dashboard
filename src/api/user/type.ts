export enum UserRole {
    Undefined,
    Admin,
    Moderator,
    Teacher,
    Student = "Student",
}

export enum UserStatus {
    All = "All",
    Active = "Active",
    Pending = "Pending",
    Blocked = "Blocked",
    Deleted = "Deleted",
}

export type UserPreview = {
    id: string;
    username: string;
    email: string;
    fullname: string;
    roleName: string;
    status: UserStatus;
    profilePicture: string;
    createdAt: Date;
};

export type User = {
    id: string;
    username: string;
    email: string;
    bio: string | null;
    fullname: string;
    roleName: string | null;
    provider: string;
    status: string;
    timezone: string;
    lastLoginAt: Date;
    profilePicture: string;
    deletedAt: null;
    isNewUser: boolean;
    notes: string[];
    recentViews: string[];
    reports: string[];
};

export type Teacher = User & {
    graduatedUniversity: string;
    contactNumber: string;
    pin: string;
    workPlace: string;
    subjectsTaught: string;
    rating: number;
    experienceYears: number;
    verified: boolean;
    videoIntroduction: string;
    certificates: string[];
};

export type Student = User & {
    grade: number;
    schoolName: string;
    enrollments: unknown[];
};
