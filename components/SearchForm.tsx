"use client";

import { useMemo, useState } from "react";
import { Plane, TrainFront, Bus, Search, Luggage } from "lucide-react";
import { t, Lang } from "../lib/i18n";
import { Destination } from "../lib/api";

interface Props {
  lang: Lang;
  destinations: Destination[];
  loading: boolean;
  onSearch: (params: {
    origin: string;
    budget: number;
    month: string;
    nights: number;
    transportModes: string[];
    minHotelRating: number;
    bags: number;
    accommodationType: string;
    excludeCountries: string[];
  }) => void;
}

function nextMonths(count: number): string[] {
  const out: string[] = [];
  const d = new Date();
  for (let i = 0; i < count; i++) {
    const dt = new Date(d.getFullYear(), d.getMonth() + i, 1);
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    out.push(`${dt.getFullYear()}-${m}`);
  }
  return out;
}

export default function SearchForm({
  lang,
  destinations,
  loading,
  onSearch,
}: Props) {
  const months = nextMonths(12);
  const [origin, setOrigin] = useState("BCN");
  const [budget, setBudget] = useState(500);
  const [month, setMonth] = useState(months[1]);
  const [nights, setNights] = useState(4);
  const [modes, setModes] = useState<string[]>(["flight", "train", "bus"]);
  const [bags, setBags] = useState(0);
  const [acc, setAcc] = useState("hotel");
  const [excluded, setExcluded] = useState<string[]>([]);

  const countries = useMemo(() => {
    const seen = new Map<string, string>();
    destinations.forEach((d) => {
      if (!seen.has(d.country)) seen.set(d.country, d.flag);
    });
    return Array.from(seen.entries()); // [country, flag]
  }, [destinations]);

  const toggleMode = (m: string) => {
    setModes((prev) => {
      if (prev.includes(m)) {
        const next = prev.filter((x) => x !== m);
        return next.length ? next : prev;
      }
      return [...prev, m];
    });
  };

  const toggleCountry = (c: string) => {
    setExcluded((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const modeButtons = [
    { id: "flight", icon: Plane, label: t(lang, "flight") },
    { id: "train", icon: TrainFront, label: t(lang, "train") },
    { id: "bus", icon: Bus, label: t(lang, "bus") },
  ];

  const accButtons = [
    { id: "hotel", label: t(lang, "accHotel") },
    { id: "hostel", label: t(lang, "accHostel") },
    { id: "any", label: t(lang, "accAny") },
  ];

  const btn = (active: boolean) =>
    `px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
      active
        ? "bg-blue-600 border-blue-600 text-white"
        : "bg-white border-gray-200 text-gray-500"
    }`;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            {t(lang, "origin")}
          </label>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-lg p-3"
          >
            {destinations.map((d) => (
              <option key={d.code} value={d.code}>
                {d.flag} {d.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            {t(lang, "budget")}
          </label>
          <input
            type="number"
            min={100}
            step={50}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full border-2 border-gray-200 rounded-lg p-3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            {t(lang, "month")}
          </label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-lg p-3"
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            {t(lang, "nights")}
          </label>
          <input
            type="number"
            min={1}
            max={21}
            value={nights}
            onChange={(e) => setNights(Number(e.target.value))}
            className="w-full border-2 border-gray-200 rounded-lg p-3"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          {t(lang, "transport")}
        </label>
        <div className="flex gap-2">
          {modeButtons.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => toggleMode(id)}
              className={`flex items-center gap-2 ${btn(modes.includes(id))}`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            <span className="flex items-center gap-1">
              <Luggage size={16} /> {t(lang, "bags")}
            </span>
          </label>
          <div className="flex gap-2">
            {[0, 1, 2].map((n) => (
              <button key={n} onClick={() => setBags(n)} className={btn(bags === n)}>
                {n}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-1">{t(lang, "bagsHint")}</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            {t(lang, "accommodation")}
          </label>
          <div className="flex gap-2 flex-wrap">
            {accButtons.map(({ id, label }) => (
              <button key={id} onClick={() => setAcc(id)} className={btn(acc === id)}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          {t(lang, "avoidCountries")}
        </label>
        <div className="flex gap-2 flex-wrap">
          {countries.map(([country, flag]) => (
            <button
              key={country}
              onClick={() => toggleCountry(country)}
              className={`px-3 py-1 rounded-full border text-sm transition-colors ${
                excluded.includes(country)
                  ? "bg-red-50 border-red-400 text-red-600 line-through"
                  : "bg-white border-gray-200 text-gray-600"
              }`}
            >
              {flag} {country}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() =>
          onSearch({
            origin,
            budget,
            month,
            nights,
            transportModes: modes,
            minHotelRating: 0,
            bags,
            accommodationType: acc,
            excludeCountries: excluded,
          })
        }
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        <Search size={20} />
        {loading ? t(lang, "searching") : t(lang, "search")}
      </button>
    </div>
  );
}