"use client";

import { useEffect, useState } from "react";
import { Lang, t } from "../lib/i18n";
import {
  Destination,
  TravelPackage,
  fetchDestinations,
  searchPackages,
} from "../lib/api";
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import ResultsList from "../components/ResultsList";

export interface SearchFormValues {
  origin: string;
  budget: number;
  month: string;
  nights: number;
  transportModes: string[];
  minHotelRating: number;
  bags: number;
  accommodationType: string;
  excludeCountries: string[];
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [waking, setWaking] = useState(true);
  const [packages, setPackages] = useState<TravelPackage[] | null>(null);
  const [nights, setNights] = useState(4);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Langue du navigateur au premier chargement
  useEffect(() => {
    const nav = navigator.language.slice(0, 2);
    if (nav === "fr" || nav === "es") setLang(nav as Lang);
  }, []);

  // Destinations localisées, avec retry pour le cold start Render
  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    const load = () => {
      fetchDestinations(lang)
        .then((d) => {
          if (cancelled) return;
          setDestinations(d);
          setWaking(false);
        })
        .catch(() => {
          if (cancelled) return;
          attempts += 1;
          if (attempts < 6) {
            setTimeout(load, 10000); // retry aux 10s (~1 min total)
          } else {
            setWaking(false);
            setError(true);
          }
        });
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const handleSearch = async (p: SearchFormValues) => {
    setLoading(true);
    setError(false);
    setNights(p.nights);
    try {
      const results = await searchPackages({ ...p, lang });
      setPackages(results);
    } catch {
      setError(true);
      setPackages(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen max-w-3xl mx-auto px-4 py-8 space-y-6">
      <Header lang={lang} onLangChange={setLang} />

      {waking && destinations.length === 0 && (
        <p className="text-center text-sm text-gray-400 animate-pulse">
          {t(lang, "waking")}
        </p>
      )}

      <SearchForm
        lang={lang}
        destinations={destinations}
        loading={loading}
        onSearch={handleSearch}
      />

      <ResultsList
        packages={packages}
        lang={lang}
        nights={nights}
        error={error}
      />
    </main>
  );
}