export default function SkeletonCard() {
  return (
    <div className="bg-white/70 backdrop-blur rounded-3xl shadow-lg shadow-slate-200/60 p-5 space-y-4 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="h-6 w-36 bg-slate-200 rounded-lg" />
          <div className="h-3.5 w-20 bg-slate-100 rounded-lg" />
        </div>
        <div className="space-y-2 flex flex-col items-end">
          <div className="h-7 w-24 bg-indigo-100 rounded-lg" />
          <div className="h-4 w-28 bg-emerald-50 rounded-full" />
        </div>
      </div>
      <div className="rounded-2xl bg-slate-50 p-3.5 space-y-3">
        <div className="h-4 w-3/4 bg-slate-200 rounded" />
        <div className="h-3 w-1/2 bg-slate-100 rounded" />
        <div className="h-4 w-2/3 bg-slate-200 rounded" />
      </div>
      <div className="flex gap-2">
        <div className="h-10 flex-1 bg-indigo-100 rounded-xl" />
        <div className="h-10 flex-1 bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
}