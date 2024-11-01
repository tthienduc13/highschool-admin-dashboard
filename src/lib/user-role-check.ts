import { Student, Teacher, User } from "@/api/user/type";

export function isTeacher(user: User): user is Teacher {
    return user !== undefined && "graduatedUniversity" in user;
}

export function isStudent(user: User | undefined): user is Student {
    return user !== undefined && "grade" in user;
}
