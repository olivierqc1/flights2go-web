"use client";

import { useEffect, useState } from "react";
import type { SearchFormValues } from "../app/page";

const KEY = "t2g_recent";
const MAX = 3;

export function useRecentSearches() {
  const [recent, setRecent] = useState<SearchFormValues[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setRecent(JSON.parse(raw));
    } catch {
      /* localStorage indisponible : on vit sans */
    }
  }, []);

  const save = (v: SearchFormValues) => {
    setRecent((prev) => {
      const next = [
        v,
        ...prev.filter(
          (p) => !(p.origin === v.origin && p.budget === v.budget && p.month === v.month)
        ),
      ].slice(0, MAX);
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* rien */
      }
      return next;
    });
  };

  return { recent, save };
}