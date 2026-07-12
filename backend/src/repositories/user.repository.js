import { prisma } from "../lib/prisma.js";
export class UserRepository {
    async findById(id) {
        return prisma.user.findUnique({
            where: { id },
        });
    }
    async findByEmail(email) {
        return prisma.user.findUnique({
            where: { email },
        });
    }
    async findByUsername(username) {
        return prisma.user.findUnique({
            where: { username },
        });
    }
    async create(data) {
        return prisma.user.create({
            data,
        });
    }
}
//# sourceMappingURL=user.repository.js.map