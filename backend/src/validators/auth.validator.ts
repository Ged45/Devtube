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

export const UpdateProfileSchema = z.object({
  email: z.email().optional(),
  username: z.string().min(3).max(20).optional(),
  firstName: z.string().max(50).optional(),
  lastName: z.string().max(50).optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "Provide at least one profile field to update",
});

export type UpdateProfileDto = z.infer<typeof UpdateProfileSchema>;
