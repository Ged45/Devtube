import { getAllVideos, getVideoById } from "../repositories/video.repository.js";

export class VideoService {
  async listVideos() {
    return getAllVideos();
  }

  async getVideo(id: number) {
    return getVideoById(id);
  }
}
