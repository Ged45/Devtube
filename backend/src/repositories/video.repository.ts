import prisma from "../config/prisma.js";

export function createVideo(data: {
  title: string;
  description?: string;
  filename: string;
  userId: number;
}) {
  return prisma.video.create({
    data,
  });
}

