import { VideoService } from "../services/video.services.js";
const videoService = new VideoService();
export class VideoController {
    async list(req, res) {
        const videos = await videoService.listVideos();
        res.json(videos);
    }
    async get(req, res) {
        const videoId = Number(req.params.id);
        const video = await videoService.getVideo(videoId);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        res.json(video);
    }
}
//# sourceMappingURL=video.controller.js.map