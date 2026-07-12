import type { Prisma, User } from "@prisma/client";
export declare class UserRepository {
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    create(data: Prisma.UserCreateInput): Promise<User>;
}
//# sourceMappingURL=user.repository.d.ts.map