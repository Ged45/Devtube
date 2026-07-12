import { useState } from "react";
import { Link } from "react-router-dom";
import { SearchIcon, UploadIcon, UserCircleIcon } from "./icons";

export default function Header() {
  const [q, setQ] = useState("");

  return (
    <header className="bg-white shadow sticky top-0 z-30">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-lg font-bold text-white shadow-sm">
            DT
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900">Devtube</p>
            <p className="text-xs text-slate-500">Your video hub</p>
          </div>
        </div>

        <div className="w-full md:max-w-xl">
          <form className="flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm" onSubmit={(e) => e.preventDefault()}>
            <SearchIcon className="mr-2 h-4 w-4 text-slate-500" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search videos"
              className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
            <button className="ml-3 flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
              <SearchIcon className="h-4 w-4" />
              Search
            </button>
          </form>
        </div>

        <div className="flex items-center gap-3 text-sm md:text-base">
          <Link
            to="/upload"
            className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 transition hover:bg-slate-100 md:flex"
          >
            <UploadIcon className="h-4 w-4 text-slate-700" />
            Upload
          </Link>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-600">
            <UserCircleIcon className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
