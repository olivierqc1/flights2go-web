"use client";

import { useEffect, useState } from "react";
import { Destination, fetchDestinations } from "./api";
import { Lang } from "./i18n";

export function useDestinations(lang: Lang) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [waking, setWaking] = useState(true);
  const [failed, setFailed] = useState(false);

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
            setTimeout(load, 10000);
          } else {
            setWaking(false);
            setFailed(true);
          }
        });
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  return { destinations, waking, failed };
}