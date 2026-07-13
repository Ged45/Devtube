import dotenv from "dotenv";

dotenv.config({ override: false });

export const env = {
  PORT: Number(process.env.PORT) || 5000,

  DATABASE_URL:
    process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/devtube?schema=public",

  JWT_SECRET: process.env.JWT_SECRET || "",

  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
};