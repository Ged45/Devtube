import type { NextFunction, Request, Response } from "express";
import { VideoService } from "../services/video.services.js";

export class VideoController {
  constructor(private readonly videoService: VideoService = new VideoService()) {}

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const videos = await this.videoService.listVideos();
      res.json(videos);
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const videoId = Number(req.params.id);
      const video = await this.videoService.getVideo(videoId);
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      res.json(video);
    } catch (error) {
      next(error);
    }
  }
}
