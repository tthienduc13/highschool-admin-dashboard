import { useQuery } from "@tanstack/react-query";
import { getSubjects } from "./api";

// export const UseGetSubjectsQuery = ({
//     search,
//     grades,
//     pageNumber,
//     pageSize,
// }: {
//     search?: string;
//     grades: string[];
//     pageNumber: number;
//     pageSize: number;
// }) => {
//     return useQuery({
//         queryKey: ["subjects", search, grades, pageNumber, pageSize],
//         queryFn: async () => {
//             let subjects: Subject[] = [];

//             if (grades?.length > 0) {
//                 grades?.forEach(async (grade) => {
//                     const result = await getSubjects({
//                         search: search,
//                         grade: grade,
//                         pageNumber: pageNumber,
//                         pageSize: pageSize,
//                     })

//                     subjects = subjects.concat(result.data);
//                 })
//             } else {
//                 const result = await getSubjects({
//                     search: search,
//                     pageNumber: pageNumber,
//                     pageSize: pageSize,
//                 })

//                 subjects = result.data;
//             }

//             return subjects;
//         }
//     });
// }

export const UseGetSubjectsQuery = ({
    search,
    pageNumber,
    pageSize,
}: {
    search?: string;
    pageNumber: number;
    pageSize: number;
}) => {
    return useQuery({
        queryKey: ["subjects", search, pageNumber, pageSize],
        queryFn: async () => getSubjects({
            search: search,
            pageNumber: pageNumber,
            pageSize: pageSize,
        })
    });
}