import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import { fetchVideos } from "../services/video";

type Video = {
  id: number;
  title: string;
  description?: string;
  filename: string;
  createdAt: string;
  uploader: { username: string };
};

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVideos()
      .then((data) => setVideos(data))
      .catch((err) => setError(err?.message || "Unable to load videos"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="flex-1">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Recommended</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Fresh videos for you</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Discover the latest uploads, trending creators, and curated playlists from across Devtube.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {['All', 'Trending', 'Subscriptions', 'Music'].map((label) => (
              <button
                key={label}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-72 rounded-[1.5rem] bg-slate-100 shadow-sm" />
            ))
          ) : error ? (
            <div className="col-span-full rounded-[1.5rem] bg-rose-50 p-6 text-sm text-rose-700">{error}</div>
          ) : videos.length === 0 ? (
            <div className="col-span-full rounded-[1.5rem] bg-slate-50 p-6 text-sm text-slate-700">No videos have been uploaded yet.</div>
          ) : (
            videos.map((video) => (
              <Link key={video.id} to={`/watch/${video.id}`} className="block transition hover:-translate-y-1 hover:shadow-lg">
                <VideoCard
                  title={video.title}
                  author={video.uploader.username}
                  views={new Date(video.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
