import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { verifyAccessToken } from "../utils/jwt.js";

import { AppError } from "../utils/app-error.js";

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const header =
    req.headers.authorization;

  if (!header) {
    throw new AppError(
      401,
      "Missing Authorization Header"
    );
  }

  const token =
    header.replace("Bearer ", "");

  const payload =
    verifyAccessToken(token);

  (req as any).user = payload;

  next();
}