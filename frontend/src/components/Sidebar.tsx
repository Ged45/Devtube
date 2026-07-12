import { FireIcon, HomeIcon, LibraryIcon, VideoIcon } from "./icons";

export default function Sidebar() {
  return (
    <aside className="w-64 hidden lg:block rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
      <nav className="space-y-3 text-sm text-slate-600">
        <a className="flex items-center gap-3 rounded-3xl px-3 py-3 transition hover:bg-slate-100" href="#">
          <HomeIcon className="h-5 w-5 text-slate-500" />
          Home
        </a>
        <a className="flex items-center gap-3 rounded-3xl px-3 py-3 transition hover:bg-slate-100" href="#">
          <FireIcon className="h-5 w-5 text-slate-500" />
          Trending
        </a>
        <a className="flex items-center gap-3 rounded-3xl px-3 py-3 transition hover:bg-slate-100" href="#">
          <VideoIcon className="h-5 w-5 text-slate-500" />
          Subscriptions
        </a>
        <div className="my-3 h-px bg-slate-100" />
        <a className="flex items-center gap-3 rounded-3xl px-3 py-3 transition hover:bg-slate-100" href="#">
          <LibraryIcon className="h-5 w-5 text-slate-500" />
          Library
        </a>
        <a className="flex items-center gap-3 rounded-3xl px-3 py-3 transition hover:bg-slate-100" href="#">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-slate-500">
            <path d="M3 6h18" />
            <path d="M5 6v12" />
            <path d="M19 6v12" />
          </svg>
          History
        </a>
      </nav>
    </aside>
  );
}
