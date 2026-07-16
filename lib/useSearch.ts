"use client";

import { useState } from "react";
import { TravelPackage, searchPackages } from "./api";
import { Lang } from "./i18n";
import type { SearchFormValues } from "../app/page";

export function useSearch(lang: Lang) {
  const [packages, setPackages] = useState<TravelPackage[] | null>(null);
  const [nights, setNights] = useState(4);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const search = async (p: SearchFormValues) => {
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

  return { packages, nights, loading, error, search };
}