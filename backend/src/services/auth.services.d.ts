import { UserRepository } from "../repositories/user.repository.js";
import type { RegisterDto, LoginDto } from "../types/auth.types.js";
export declare class AuthService {
    private readonly userRepository;
    constructor(userRepository?: UserRepository);
    register(data: RegisterDto): Promise<{
        user: {
            id: number;
            email: string;
            username: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            avatarUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    uploadVideo(title: string, description: string | undefined, filename: string, userId: number): Promise<any>;
    login(data: LoginDto): Promise<{
        user: {
            id: number;
            email: string;
            username: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            avatarUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
}
//# sourceMappingURL=auth.services.d.ts.map