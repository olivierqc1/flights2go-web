"use client";

import { useEffect, useState } from "react";
import { Lang, t } from "../lib/i18n";
import { useDestinations } from "../lib/useDestinations";
import { useSearch } from "../lib/useSearch";
import { useRecentSearches } from "../lib/useRecentSearches";
import { queryToValues, writeQuery } from "../lib/urlParams";
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import ResultsList from "../components/ResultsList";

export interface SearchFormValues {
  origin: string;
  budget: number;
  currency: string;
  month: string;
  nights: number;
  travelers: number;
  tripType: string;
  transportModes: string[];
  minHotelRating: number;
  bags: number;
  accommodationType: string;
  excludeCountries: string[];
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [initial, setInitial] = useState<SearchFormValues | null>(null);
  const [ready, setReady] = useState(false);
  const [autoRan, setAutoRan] = useState(false);

  useEffect(() => {
    const nav = navigator.language.slice(0, 2);
    if (nav === "fr" || nav === "es") setLang(nav as Lang);
    setInitial(queryToValues());
    setReady(true);
  }, []);

  const { destinations, waking, failed } = useDestinations(lang);
  const { packages, nights, loading, error, search } = useSearch(lang);
  const { recent, save } = useRecentSearches();

  // Auto-recherche si l'URL contient des critères partagés
  useEffect(() => {
    if (!autoRan && initial && destinations.length > 0) {
      setAutoRan(true);
      search(initial);
    }
  }, [initial, destinations, autoRan]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = (p: SearchFormValues) => {
    writeQuery(p);
    save(p);
    search(p);
  };

  return (
    <main className="min-h-screen max-w-3xl mx-auto px-4 py-8 space-y-6">
      <Header lang={lang} onLangChange={setLang} />

      {waking && destinations.length === 0 && (
        <p className="text-center text-sm text-slate-400 animate-pulse">
          {t(lang, "waking")}
        </p>
      )}

      {ready && (
        <SearchForm
          key={initial ? "url" : "default"}
          lang={lang}
          destinations={destinations}
          loading={loading}
          initial={initial ?? undefined}
          onSearch={handleSearch}
        />
      )}

      {recent.length > 0 && !packages && !loading && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            {t(lang, "recent")}
          </p>
          <div className="flex gap-2 flex-wrap">
            {recent.map((r, i) => (
              <button key={i} onClick={() => handleSearch(r)}
                className="px-3 py-1.5 rounded-full bg-white/80 border border-slate-200 text-sm text-slate-600 hover:border-indigo-300 transition-all">
                {r.origin} · {r.budget} {r.currency} · {r.month}
              </button>
            ))}
          </div>
        </div>
      )}

      <ResultsList
        packages={packages}
        lang={lang}
        nights={nights}
        error={error || failed}
        loading={loading}
      />
    </main>
  );
}