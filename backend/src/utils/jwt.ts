import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: number;
  email: string;
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as TokenPayload;
}