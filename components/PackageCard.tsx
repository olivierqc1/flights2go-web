"use client";

import {
  Plane, TrainFront, Bus, BedDouble, ExternalLink, Clock, CalendarDays,
} from "lucide-react";
import { t, Lang } from "../lib/i18n";
import { TravelPackage } from "../lib/api";

const MODE_ICONS = { flight: Plane, train: TrainFront, bus: Bus };

interface Props {
  pkg: TravelPackage;
  lang: Lang;
  nights: number;
}

export default function PackageCard({ pkg, lang, nights }: Props) {
  const Icon = MODE_ICONS[pkg.transport.mode] ?? Plane;

  const stopsLabel = () => {
    const s = pkg.transport.stops ?? 0;
    if (pkg.transport.mode !== "flight") return null;
    if (s === 0) return t(lang, "stops_0");
    if (s === 1) return t(lang, "stops_1");
    return `${s} ${t(lang, "stops_n")}`;
  };

  const depDate = pkg.transport.departure_date
    ? new Date(pkg.transport.departure_date + "T12:00:00").toLocaleDateString(
        lang === "en" ? "en-GB" : lang === "es" ? "es-ES" : "fr-FR",
        { day: "numeric", month: "short" }
      )
    : null;

  return (
    <div className="bg-white/80 backdrop-blur rounded-3xl shadow-lg shadow-slate-200/60 hover:shadow-xl hover:-translate-y-0.5 transition-all p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-extrabold tracking-tight">
            <span className="mr-1.5">{pkg.flag}</span>
            {pkg.destination}
          </h3>
          <p className="text-sm text-slate-400">{pkg.country}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            {pkg.total_cost.toFixed(0)}€
          </p>
          <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full px-2 py-0.5 inline-block">
            {t(lang, "remaining")} {pkg.budget_remaining.toFixed(0)}€
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-50/80 p-3.5 space-y-2.5 text-sm">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-slate-700">
            <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-600">
              <Icon size={15} />
            </span>
            <span className="font-medium">{t(lang, pkg.transport.mode)}</span>
            {pkg.transport.carrier && (
              <span className="text-slate-400 text-xs">{pkg.transport.carrier}</span>
            )}
          </span>
          <span className="font-bold">
            {t(lang, "from")} {pkg.transport.price.toFixed(0)}€
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400 pl-9">
          {depDate && (
            <span className="flex items-center gap-1 text-indigo-500 font-medium">
              <CalendarDays size={11} />
              {t(lang, "departure")} {depDate}
            </span>
          )}
          {pkg.transport.duration_hours != null && (
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {pkg.transport.duration_hours}{t(lang, "hours")}
            </span>
          )}
          {stopsLabel() && <span>{stopsLabel()}</span>}
        </div>

        <div className="flex items-center justify-between border-t border-slate-200/70 pt-2.5">
          <span className="flex items-center gap-2 text-slate-700">
            <span className="p-1.5 rounded-lg bg-violet-100 text-violet-600">
              <BedDouble size={15} />
            </span>
            <span className="font-medium">{pkg.hotel.name}</span>
          </span>
          <span className="font-bold">
            {pkg.hotel.price_per_night.toFixed(0)}€{t(lang, "perNight")}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <a href={pkg.transport.booking_url} target="_blank" rel="noopener noreferrer sponsored"
          className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-all active:scale-[0.98]">
          {t(lang, "bookTransport")} <ExternalLink size={14} />
        </a>
        <a href={pkg.hotel.booking_url} target="_blank" rel="noopener noreferrer sponsored"
          className="flex-1 flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold py-2.5 rounded-xl transition-all active:scale-[0.98]">
          {t(lang, "bookHotel")} <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}