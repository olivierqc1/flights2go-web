"use client";

import { useMemo, useState } from "react";
import { PiggyBank, TrendingDown, Zap } from "lucide-react";
import { t, Lang } from "../lib/i18n";
import { TravelPackage } from "../lib/api";
import PackageCard from "./PackageCard";
import SkeletonCard from "./SkeletonCard";

type SortKey = "budget" | "price" | "fast";

interface Props {
  packages: TravelPackage[] | null;
  lang: Lang;
  nights: number;
  error: boolean;
  loading: boolean;
}

export default function ResultsList({ packages, lang, nights, error, loading }: Props) {
  const [sort, setSort] = useState<SortKey>("budget");

  const sorted = useMemo(() => {
    if (!packages) return null;
    const arr = [...packages];
    if (sort === "price") {
      arr.sort((a, b) => a.transport.price - b.transport.price);
    } else if (sort === "fast") {
      arr.sort(
        (a, b) =>
          (a.transport.duration_hours ?? Infinity) -
          (b.transport.duration_hours ?? Infinity)
      );
    } else {
      arr.sort((a, b) => b.budget_remaining - a.budget_remaining);
    }
    return arr;
  }, [packages, sort]);

  if (loading) {
    return (
      <section className="space-y-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </section>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{t(lang, "error")}</p>;
  }
  if (!sorted) return null;

  const sortBtns: { id: SortKey; icon: any; lbl: string }[] = [
    { id: "budget", icon: PiggyBank, lbl: t(lang, "sortBudget") },
    { id: "price", icon: TrendingDown, lbl: t(lang, "sortPrice") },
    { id: "fast", icon: Zap, lbl: t(lang, "sortFast") },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <p className="text-sm text-slate-500">
          {sorted.length} {t(lang, "results")}
        </p>
        <div className="flex gap-1.5">
          {sortBtns.map(({ id, icon: Icon, lbl }) => (
            <button key={id} onClick={() => setSort(id)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                sort === id
                  ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "bg-white border-slate-200 text-slate-500"
              }`}>
              <Icon size={13} />
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {sorted.length === 0 && (
        <p className="text-center text-slate-500 py-8">{t(lang, "noResults")}</p>
      )}
      {sorted.map((pkg) => (
        <PackageCard key={pkg.code} pkg={pkg} lang={lang} nights={nights} />
      ))}
      <p className="text-xs text-slate-400 text-center pt-4">
        {t(lang, "disclosure")}
      </p>
    </section>
  );
} 