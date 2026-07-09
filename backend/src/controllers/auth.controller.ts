import { Request, Response } from "express";
import * as authService from "../services/auth.services.js";
import { uploadVideo } from "../services/auth.services.js";
export async function register(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;

    const user = await authService.register(
      username,
      email,
      password
    );

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error ? error.message : "Registration failed",
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    return res.json(result);
  } catch (error) {
    return res.status(401).json({
      message:
        error instanceof Error ? error.message : "Login failed",
    });
  }
}

export async function upload(req, res) {
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      message: "Video is required",
    });
  }

  const video = await uploadVideo(
    req.body.title,
    req.body.description,
    file.filename,
    req.user!.id
  );

  return res.status(201).json(video);
}