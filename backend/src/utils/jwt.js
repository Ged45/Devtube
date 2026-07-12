import { sign, verify } from "jsonwebtoken";
import { env } from "../config/env.js";
const jwtSecret = env.JWT_SECRET;
const jwtOptions = {
    expiresIn: env.JWT_EXPIRES_IN,
};
export function generateAccessToken(payload) {
    return sign(payload, jwtSecret, jwtOptions);
}
export function verifyAccessToken(token) {
    return verify(token, jwtSecret);
}
//# sourceMappingURL=jwt.js.map