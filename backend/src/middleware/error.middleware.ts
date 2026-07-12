import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { ZodError } from "zod";

import { AppError } from "../utils/app-error.js";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {

  if (err instanceof ZodError) {

    return res.status(400).json({

      message: "Validation failed",

      errors: err.issues,

    });

  }

  if (err instanceof AppError) {

    return res.status(err.statusCode).json({

      message: err.message,

    });

  }

  console.error(err);

  return res.status(500).json({

    message: "Internal Server Error",

  });

}