import { AuthService } from "../services/auth.services.js";
import { LoginSchema, RegisterSchema, } from "../validators/auth.validator.js";
const authService = new AuthService();
export class AuthController {
    async register(req, res) {
        const data = RegisterSchema.parse(req.body);
        const result = await authService.register(data);
        res.status(201).json(result);
    }
    async login(req, res) {
        const data = LoginSchema.parse(req.body);
        const result = await authService.login(data);
        res.json(result);
    }
    async upload(req, res) {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "Video is required" });
        }
        const { title, description } = req.body;
        const user = req.user;
        const video = await authService.uploadVideo(title, description, file.filename, user.userId);
        res.status(201).json(video);
    }
}
//# sourceMappingURL=auth.controller.js.map