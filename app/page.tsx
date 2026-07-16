"use client";

import { useEffect, useState } from "react";
import { Lang, LANGS, t } from "../lib/i18n";
import {
  Destination,
  TravelPackage,
  fetchDestinations,
  searchPackages,
} from "../lib/api";
import SearchForm from "../components/SearchForm";
import PackageCard from "../components/PackageCard";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [packages, setPackages] = useState<TravelPackage[] | null>(null);
  const [nights, setNights] = useState(4);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Détecter la langue du navigateur au premier chargement
  useEffect(() => {
    const nav = navigator.language.slice(0, 2);
    if (nav === "fr" || nav === "es") setLang(nav as Lang);
  }, []);

  // Charger les destinations (relocalisées à chaque changement de langue)
  useEffect(() => {
    fetchDestinations(lang)
      .then(setDestinations)
      .catch(() => setError(true));
  }, [lang]);

  const handleSearch = async (p: {
    origin: string;
    budget: number;
    month: string;
    nights: number;
    transportModes: string[];
    minHotelRating: number;
  }) => {
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
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-600">
            {t(lang, "title")}
          </h1>
          <p className="text-gray-500">{t(lang, "tagline")}</p>
        </div>
        <div className="flex gap-1">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
                lang === l.code
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-500 border border-gray-200"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </header>

      <SearchForm
        lang={lang}
        destinations={destinations}
        loading={loading}
        onSearch={handleSearch}
      />

      {error && (
        <p className="text-center text-red-600">{t(lang, "error")}</p>
      )}

      {packages && !error && (
        <section className="space-y-4">
          <p className="text-sm text-gray-500">
            {packages.length} {t(lang, "results")}
          </p>
          {packages.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              {t(lang, "noResults")}
            </p>
          )}
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.code}
              pkg={pkg}
              lang={lang}
              nights={nights}
            />
          ))}
          <p className="text-xs text-gray-400 text-center pt-4">
            {t(lang, "disclosure")}
          </p>
        </section>
      )}
    </main>
  );
}