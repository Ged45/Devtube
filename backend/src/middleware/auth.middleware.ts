import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";
import { findById } from "../repositories/user.repository.js";

export async function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const token = authHeader.split(" ")[1];

        const payload = verifyToken(token);

        const user = await findById(payload.userId);

        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        req.user = user;

        next();

    } catch {

        return res.status(401).json({

            message:"Invalid token"

        });

    }
}