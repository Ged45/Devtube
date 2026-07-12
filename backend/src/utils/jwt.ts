import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export interface JwtPayload {
  userId: number;
  email: string;
}

const jwtSecret = env.JWT_SECRET as string;
const jwtOptions = {
  expiresIn: env.JWT_EXPIRES_IN as unknown,
} as import("jsonwebtoken").SignOptions;

export function generateAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, jwtSecret, jwtOptions);
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, jwtSecret) as JwtPayload;
}
