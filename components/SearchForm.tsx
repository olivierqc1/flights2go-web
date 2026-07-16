"use client";

import { useMemo, useState } from "react";
import {
  Plane, TrainFront, Bus, Search, Luggage, Users,
  CalendarRange, CalendarHeart,
} from "lucide-react";
import { t, Lang } from "../lib/i18n";
import { Destination } from "../lib/api";
import type { SearchFormValues } from "../app/page";

interface Props {
  lang: Lang;
  destinations: Destination[];
  loading: boolean;
  onSearch: (params: SearchFormValues) => void;
}

function nextMonths(count: number): string[] {
  const out: string[] = [];
  const d = new Date();
  for (let i = 0; i < count; i++) {
    const dt = new Date(d.getFullYear(), d.getMonth() + i, 1);
    out.push(`${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}`);
  }
  return out;
}

const field =
  "w-full rounded-xl bg-slate-50 border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition";
const label = "block text-sm font-semibold text-slate-600 mb-1.5";

export default function SearchForm({ lang, destinations, loading, onSearch }: Props) {
  const months = nextMonths(12);
  const [origin, setOrigin] = useState("BCN");
  const [budget, setBudget] = useState(500);
  const [month, setMonth] = useState(months[1]);
  const [nights, setNights] = useState(4);
  const [travelers, setTravelers] = useState(1);
  const [tripType, setTripType] = useState("month");
  const [modes, setModes] = useState<string[]>(["flight", "train", "bus"]);
  const [bags, setBags] = useState(0);
  const [acc, setAcc] = useState("hotel");
  const [excluded, setExcluded] = useState<string[]>([]);

  const countries = useMemo(() => {
    const seen = new Map<string, string>();
    destinations.forEach((d) => {
      if (!seen.has(d.country)) seen.set(d.country, d.flag);
    });
    return Array.from(seen.entries());
  }, [destinations]);

  const pickTrip = (type: string) => {
    setTripType(type);
    if (type === "weekend") setNights(2);
  };

  const toggleMode = (m: string) =>
    setModes((prev) => {
      if (prev.includes(m)) {
        const next = prev.filter((x) => x !== m);
        return next.length ? next : prev;
      }
      return [...prev, m];
    });

  const toggleCountry = (c: string) =>
    setExcluded((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  const pill = (active: boolean) =>
    `px-4 py-2 rounded-full border font-medium transition-all ${
      active
        ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200"
        : "bg-white border-slate-200 text-slate-500 hover:border-indigo-300"
    }`;

  const circle = (active: boolean) =>
    `w-10 h-10 rounded-full border font-semibold transition-all ${
      active
        ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200"
        : "bg-white border-slate-200 text-slate-500"
    }`;

  return (
    <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl shadow-slate-200/60 p-6 space-y-5">
      {/* Budget en premier — la question centrale */}
      <div>
        <label className={label}>{t(lang, "budget")}</label>
        <input
          type="number" min={100} step={50} value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className={`${field} text-3xl font-extrabold text-indigo-700 text-center`}
        />
        <input
          type="range" min={100} max={3000} step={50} value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full mt-2 accent-indigo-600"
        />
      </div>

      {/* Type de voyage */}
      <div>
        <label className={label}>{t(lang, "when")}</label>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => pickTrip("month")}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border font-medium transition-all ${
              tripType === "month"
                ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200"
                : "bg-white border-slate-200 text-slate-500"
            }`}>
            <CalendarRange size={17} /> {t(lang, "tripMonth")}
          </button>
          <button onClick={() => pickTrip("weekend")}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border font-medium transition-all ${
              tripType === "weekend"
                ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200"
                : "bg-white border-slate-200 text-slate-500"
            }`}>
            <CalendarHeart size={17} /> {t(lang, "tripWeekend")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>{t(lang, "origin")}</label>
          <select value={origin} onChange={(e) => setOrigin(e.target.value)} className={field}>
            {destinations.map((d) => (
              <option key={d.code} value={d.code}>
                {d.flag} {d.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>{t(lang, "month")}</label>
          <select value={month} onChange={(e) => setMonth(e.target.value)} className={field}>
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>
            <span className="flex items-center gap-1.5"><Users size={15} /> {t(lang, "travelers")}</span>
          </label>
          <div className="flex gap-1.5 flex-wrap">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <button key={n} onClick={() => setTravelers(n)} className={circle(travelers === n)}>
                {n}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className={label}>{t(lang, "nights")}</label>
          <input
            type="number" min={1} max={21} value={nights}
            onChange={(e) => setNights(Number(e.target.value))}
            className={field}
          />
        </div>
      </div>

      <div>
        <label className={label}>{t(lang, "transport")}</label>
        <div className="flex gap-2">
          {[
            { id: "flight", icon: Plane, lbl: t(lang, "flight") },
            { id: "train", icon: TrainFront, lbl: t(lang, "train") },
            { id: "bus", icon: Bus, lbl: t(lang, "bus") },
          ].map(({ id, icon: Icon, lbl }) => (
            <button key={id} onClick={() => toggleMode(id)}
              className={`flex items-center gap-2 ${pill(modes.includes(id))}`}>
              <Icon size={17} />
              {lbl}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>
            <span className="flex items-center gap-1.5"><Luggage size={15} /> {t(lang, "bags")}</span>
          </label>
          <div className="flex gap-1.5">
            {[0, 1, 2].map((n) => (
              <button key={n} onClick={() => setBags(n)} className={circle(bags === n)}>
                {n}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-1.5">{t(lang, "bagsHint")}</p>
        </div>
        <div>
          <label className={label}>{t(lang, "accommodation")}</label>
          <div className="flex gap-1.5 flex-wrap">
            {[
              { id: "hotel", lbl: t(lang, "accHotel") },
              { id: "hostel", lbl: t(lang, "accHostel") },
              { id: "any", lbl: t(lang, "accAny") },
            ].map(({ id, lbl }) => (
              <button key={id} onClick={() => setAcc(id)}
                className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${
                  acc === id
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "bg-white border-slate-200 text-slate-500"
                }`}>
                {lbl}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className={label}>{t(lang, "avoidCountries")}</label>
        <div className="flex gap-1.5 flex-wrap">
          {countries.map(([country, flag]) => (
            <button key={country} onClick={() => toggleCountry(country)}
              className={`px-3 py-1 rounded-full border text-sm transition-all ${
                excluded.includes(country)
                  ? "bg-red-50 border-red-300 text-red-500 line-through"
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
              }`}>
              {flag} {country}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() =>
          onSearch({
            origin, budget, month, nights, travelers, tripType,
            transportModes: modes, minHotelRating: 0,
            bags, accommodationType: acc, excludeCountries: excluded,
          })
        }
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
      >
        <Search size={20} />
        {loading ? t(lang, "searching") : t(lang, "search")}
      </button>
    </div>
  );
}