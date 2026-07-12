import { useState } from "react";
import { uploadVideo } from "../services/video";
import { UploadIcon } from "../components/icons";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return setMessage("Select a file");
    try {
      await uploadVideo({ title, description, file });
      setMessage("Upload successful");
    } catch (err: any) {
      setMessage(err?.message || "Upload failed");
    }
  }

  return (
    <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-md">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900 text-white">
          <UploadIcon className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-slate-900">Upload a New Video</h2>
          <p className="mt-2 text-sm text-slate-500">Add a title, description, and choose a video file to publish.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            placeholder="Enter a video title"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[140px] rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            placeholder="Tell viewers what your video is about"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Video</label>
          <label className="flex cursor-pointer items-center justify-between rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-600 transition hover:border-slate-400">
            <span>{file ? file.name : "Select a video file"}</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-white">
              <UploadIcon className="h-4 w-4" />
              Browse
            </span>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="hidden"
            />
          </label>
        </div>

        <button
          type="submit"
          className="rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Upload Video
        </button>
      </form>

      {message && <p className="mt-4 text-sm text-slate-700">{message}</p>}
    </div>
  );
}
