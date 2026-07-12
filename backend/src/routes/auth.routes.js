import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
const controller = new AuthController();
export const authRouter = Router();
authRouter.post("/register", controller.register.bind(controller));
authRouter.post("/login", controller.login.bind(controller));
authRouter.post("/upload", authenticate, upload.single("video"), controller.upload.bind(controller));
//# sourceMappingURL=auth.routes.js.map