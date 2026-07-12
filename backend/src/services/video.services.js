import { getAllVideos, getVideoById } from "../repositories/video.repository.js";
export class VideoService {
    async listVideos() {
        return getAllVideos();
    }
    async getVideo(id) {
        return getVideoById(id);
    }
}
//# sourceMappingURL=video.services.js.map