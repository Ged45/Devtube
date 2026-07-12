import { ClockIcon } from "./icons";

export default function VideoCard({ title, thumbnail, views, author }:{title:string,thumbnail?:string,views?:string,author?:string}){
  return (
    <div className="w-full rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden rounded-t-[1.5rem] bg-slate-200">
        <div className="h-44 w-full bg-cover bg-center" style={{ backgroundImage: `url(${thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80'})` }} />
        <div className="absolute right-3 bottom-3 flex items-center gap-1 rounded-full bg-slate-950 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white opacity-90">
          <ClockIcon className="h-3.5 w-3.5" />
          12:34
        </div>
      </div>
      <div className="p-4">
        <div className="flex gap-3">
          <div className="h-11 w-11 shrink-0 rounded-full bg-slate-200" />
          <div className="flex-1">
            <div className="font-semibold text-sm leading-6 text-slate-900 line-clamp-2">{title}</div>
            <div className="mt-2 text-xs text-slate-500">{author || 'Devtube'} • {views || '1.2M views'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
