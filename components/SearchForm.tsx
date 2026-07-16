"use client";

import { useState } from "react";
import { Plane, TrainFront, Bus, Search } from "lucide-react";
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
  const [minRating, setMinRating] = useState(0);

  const toggleMode = (m: string) => {
    setModes((prev) => {
      if (prev.includes(m)) {
        const next = prev.filter((x) => x !== m);
        return next.length ? next : prev; // au moins 1 mode actif
      }
      return [...prev, m];
    });
  };

  const modeButtons = [
    { id: "flight", icon: Plane, label: t(lang, "flight") },
    { id: "train", icon: TrainFront, label: t(lang, "train") },
    { id: "bus", icon: Bus, label: t(lang, "bus") },
  ];

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
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
                modes.includes(id)
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-gray-200 text-gray-500"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          {t(lang, "hotelRating")}
        </label>
        <div className="flex gap-2">
          {[0, 3, 4, 5].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
                minRating === r
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-gray-200 text-gray-500"
              }`}
            >
              {r === 0 ? t(lang, "anyRating") : `${r}★+`}
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
            minHotelRating: minRating,
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