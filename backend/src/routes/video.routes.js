import { Router } from "express";
import { VideoController } from "../controllers/video.controller.js";
const controller = new VideoController();
export const videoRouter = Router();
videoRouter.get("/", controller.list.bind(controller));
videoRouter.get("/:id", controller.get.bind(controller));
//# sourceMappingURL=video.routes.js.map