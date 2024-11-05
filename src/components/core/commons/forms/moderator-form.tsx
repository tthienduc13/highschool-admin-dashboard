export const IMG_MAX_LIMIT = 3;
// const formSchema = z
//     .object({
//         username: z
//             .string()
//             .regex(NotSpacePattern, "Username must not contain spaces")
//             .min(4, "Username must be at least 4 letters")
//             .max(20, "Username must not exceed 20 letters"),

//         email: z
//             .string()
//             .nonempty("Email is required")
//             .email("Invalid email format")
//             .max(100, "Email must not exceed 100 characters"),

//         password: z
//             .string()
//             .nonempty("Password is required")
//             .min(8, "Password must be at least 8 characters")
//             .regex(
//                 PasswordPattern,
//                 "Password is not valid (include: lowercase, uppercase, number, and special character)"
//             ),

//         confirmPassword: z.string().nonempty("Confirm Password is required"),

//         fullname: z
//             .string()
//             .nonempty("Full Name is required")
//             .max(100, "Full Name must not exceed 100 characters"),

//         bio: z.string().max(10000, "Bio must not exceed 10000 characters"),
//     })
//     .superRefine((data, ctx) => {
//         if (data.password !== data.confirmPassword) {
//             ctx.addIssue({
//                 code: "custom",
//                 message: "Passwords don't match",
//                 path: ["confirmPassword"],
//             });
//         }
//     });

export const ModeratorForm = () => {};
