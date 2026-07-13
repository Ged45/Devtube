import type { Request, Response } from "express";
import { AuthService } from "../services/auth.services.js";
import {
  LoginSchema,
  RegisterSchema,
  UpdateProfileSchema,
} from "../validators/auth.validator.js";

const authService = new AuthService();

export class AuthController {

  async register(req: Request, res: Response) {

    const data = RegisterSchema.parse(req.body);

    const result =
      await authService.register(data);

    res.status(201).json(result);
  }

  async login(req: Request, res: Response) {

    const data = LoginSchema.parse(req.body);

    const result =
      await authService.login(data);

    res.json(result);
  }

  async upload(req: Request, res: Response) {
    const file = (req as any).file;

    if (!file) {
      return res.status(400).json({ message: "Video is required" });
    }

    const { title, description } = req.body;

    const user = (req as any).user;

    const video = await authService.uploadVideo(
      title,
      description,
      file.filename,
      user.userId
    );

    res.status(201).json(video);
  }

  async profile(req: Request, res: Response) {
    const user = await authService.getProfile((req as any).user.userId);
    res.json(user);
  }

  async updateProfile(req: Request, res: Response) {
    const data = UpdateProfileSchema.parse(req.body);
    const user = await authService.updateProfile((req as any).user.userId, data);
    res.json(user);
  }
}
