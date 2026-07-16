"use client";

import { t, Lang } from "../lib/i18n";
import { TravelPackage } from "../lib/api";
import PackageCard from "./PackageCard";

interface Props {
  packages: TravelPackage[] | null;
  lang: Lang;
  nights: number;
  error: boolean;
}

export default function ResultsList({ packages, lang, nights, error }: Props) {
  if (error) {
    return <p className="text-center text-red-600">{t(lang, "error")}</p>;
  }
  if (!packages) return null;

  return (
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
        <PackageCard key={pkg.code} pkg={pkg} lang={lang} nights={nights} />
      ))}
      <p className="text-xs text-gray-400 text-center pt-4">
        {t(lang, "disclosure")}
      </p>
    </section>
  );
}