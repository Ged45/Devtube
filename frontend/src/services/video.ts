import { api } from "./api";

export function uploadVideo(data: { title: string; description?: string; file: File }) {
  const fd = new FormData();
  fd.append("title", data.title);
  if (data.description) fd.append("description", data.description);
  fd.append("video", data.file);
  return api.post("/auth/upload", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then((r) => r.data);
}

export function fetchVideos() {
  return api.get("/videos").then((r) => r.data);
}

export function fetchVideo(id: number) {
  return api.get(`/videos/${id}`).then((r) => r.data);
}
