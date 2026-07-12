import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { LikeIcon, ShareIcon, BookmarkIcon, VideoIcon } from "../components/icons";
import { fetchVideo } from "../services/video";

type Video = {
  id: number;
  title: string;
  description?: string;
  filename: string;
  createdAt: string;
  uploader: { username: string };
};

const placeholderVideo = {
  title: "Sample Devtube Video",
  author: "Devtube Channel",
  views: "1.4M views",
  uploaded: "3 weeks ago",
  description:
    "This is a sample video detail page for Devtube. Upload your own videos and view details here.",
  duration: "12:34",
};

export default function Watch() {
  const { id } = useParams();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const videoId = Number(id);
    if (!id || Number.isNaN(videoId)) {
      setError("Invalid video selected");
      setLoading(false);
      return;
    }

    fetchVideo(videoId)
      .then((data) => setVideo(data))
      .catch((err) => setError(err?.response?.data?.message || err?.message || "Unable to load video"))
      .finally(() => setLoading(false));
  }, [id]);

  const currentVideo = video
    ? {
        title: video.title,
        author: video.uploader.username,
        views: `${new Date(video.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`,
        uploaded: "Uploaded",
        description: video.description || "No description provided.",
        duration: "12:34",
      }
    : placeholderVideo;

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
            <div>
              <Link to="/" className="font-medium text-slate-700 hover:text-slate-900">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>Watch</span>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-600">
              {video ? currentVideo.views : placeholderVideo.views}
            </span>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] bg-slate-900 shadow-lg">
            <div className="aspect-video flex items-center justify-center text-white text-xl">
              {loading ? "Loading video..." : video ? `Video Player #${id}` : "Video Preview"}
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {error ? (
              <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
                {error}
              </div>
            ) : (
              <>
                <div>
                  <h1 className="text-3xl font-semibold text-slate-900">{currentVideo.title}</h1>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span>{currentVideo.uploaded}</span>
                    <span>•</span>
                    <span>1,032 comments</span>
                    <span>•</span>
                    <span>94% liked</span>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-full bg-slate-300" />
                      <div>
                        <p className="font-semibold text-slate-900">{currentVideo.author}</p>
                        <p className="text-sm text-slate-500">1M subscribers</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                        <LikeIcon className="h-4 w-4" />
                        Like
                      </button>
                      <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                        <ShareIcon className="h-4 w-4" />
                        Share
                      </button>
                      <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                        <BookmarkIcon className="h-4 w-4" />
                        Save
                      </button>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-slate-600">{currentVideo.description}</p>
                </div>
              </>
            )}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.7fr_0.9fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Comments</h2>
            <div className="mt-4 space-y-4 text-sm text-slate-600">
              <p>Comment UI coming soon — keep exploring videos while we build it.</p>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Up next</h3>
              <div className="mt-4 space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Link
                    key={index}
                    to={`/watch/${Number(id ?? 0) + index + 1}`}
                    className="flex items-start gap-3 rounded-2xl p-3 transition hover:bg-slate-50"
                  >
                    <div className="relative h-20 w-32 overflow-hidden rounded-xl bg-slate-200">
                      <VideoIcon className="absolute left-1 top-1 h-5 w-5 text-white opacity-90" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">Related video title {index + 1}</p>
                      <p className="mt-2 text-xs text-slate-500">Devtube • 250K views</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Details</h3>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <div>
                  <span className="font-semibold text-slate-900">Duration:</span> {currentVideo.duration}
                </div>
                <div>
                  <span className="font-semibold text-slate-900">Category:</span> Education
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
