import { verifyAccessToken } from "../utils/jwt.js";
import { AppError } from "../utils/app-error.js";
export function authenticate(req, res, next) {
    const header = req.headers.authorization;
    if (!header) {
        throw new AppError(401, "Missing Authorization Header");
    }
    const token = header.replace("Bearer ", "");
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
}
//# sourceMappingURL=auth.middleware.js.map