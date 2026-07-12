import { z } from "zod";
export declare const RegisterSchema: z.ZodObject<{
    email: z.ZodEmail;
    username: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const LoginSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=auth.validator.d.ts.map