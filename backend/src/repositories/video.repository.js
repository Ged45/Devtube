import { prisma } from "../lib/prisma.js";
export function createVideo(data) {
    return prisma.video.create({
        data,
    });
}
export async function getAllVideos() {
    return prisma.video.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            uploader: {
                select: {
                    id: true,
                    username: true,
                },
            },
        },
    });
}
export async function getVideoById(id) {
    return prisma.video.findUnique({
        where: { id },
        include: {
            uploader: {
                select: {
                    id: true,
                    username: true,
                },
            },
        },
    });
}
//# sourceMappingURL=video.repository.js.map