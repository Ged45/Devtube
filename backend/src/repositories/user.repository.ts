import prisma from "../config/prisma.js";

export async function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function createUser(data: {
  username: string;
  email: string;
  password: string;
}) {
  return prisma.user.create({
    data,
  });
}