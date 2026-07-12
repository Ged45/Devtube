import { z } from "zod";
export const RegisterSchema = z.object({
    email: z.email(),
    username: z.string().min(3).max(20),
    password: z.string().min(8),
    firstName: z.string().optional(),
    lastName: z.string().optional()
});
export const LoginSchema = z.object({
    email: z.email(),
    password: z.string()
});
//# sourceMappingURL=auth.validator.js.map