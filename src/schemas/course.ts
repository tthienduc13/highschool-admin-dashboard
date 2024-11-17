import * as z from "zod";
export const CourseSchema = z.object({
    subjectName: z
        .string()
        .min(10, "Subject name needs a minimum length of 10"),
    imageRaw: z
        .union([z.instanceof(File), z.undefined()])
        .refine((file) => file === undefined || file instanceof File, {
            message: "Image is required and should be a valid file.",
        }),
    subjectCode: z.string().refine((val) => /^[A-Z]{3,4}\d{3}$/.test(val), {
        message: "You need to follow the code format",
    }),
    information: z
        .string()
        .min(20, "Subject information needs a minimum length of 20"),
    categoryId: z.string({
        required_error: "Please select a class",
    }),
    subjectDescription: z.string().min(20, {
        message: "Subject description needs a minimum length of 20",
    }),
});
