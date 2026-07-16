"use client";

import { useEffect, useState } from "react";
import { Lang, t } from "../lib/i18n";
import { useDestinations } from "../lib/useDestinations";
import { useSearch } from "../lib/useSearch";
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

  useEffect(() => {
    const nav = navigator.language.slice(0, 2);
    if (nav === "fr" || nav === "es") setLang(nav as Lang);
  }, []);

  const { destinations, waking, failed } = useDestinations(lang);
  const { packages, nights, loading, error, search } = useSearch(lang);

  return (
    <main className="min-h-screen max-w-3xl mx-auto px-4 py-8 space-y-6">
      <Header lang={lang} onLangChange={setLang} />

      {waking && destinations.length === 0 && (
        <p className="text-center text-sm text-slate-400 animate-pulse">
          {t(lang, "waking")}
        </p>
      )}

      <SearchForm
        lang={lang}
        destinations={destinations}
        loading={loading}
        onSearch={search}
      />

      <ResultsList
        packages={packages}
        lang={lang}
        nights={nights}
        error={error || failed}
      />
    </main>
  );
}