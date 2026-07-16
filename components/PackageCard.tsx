"use client";

import { Plane, TrainFront, Bus, Star, ExternalLink } from "lucide-react";
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

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">
            {pkg.flag} {pkg.destination}
          </h3>
          <p className="text-sm text-gray-500">{pkg.country}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">
            {pkg.total_cost.toFixed(0)}€
          </p>
          <p className="text-xs text-green-600 font-medium">
            {t(lang, "remaining")} {pkg.budget_remaining.toFixed(0)}€
          </p>
        </div>
      </div>

      <div className="border-t pt-3 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-gray-700">
            <Icon size={16} className="text-blue-600" />
            {t(lang, pkg.transport.mode)}
            {pkg.transport.carrier && (
              <span className="text-gray-400">· {pkg.transport.carrier}</span>
            )}
          </span>
          <span className="font-semibold">
            {t(lang, "from")} {pkg.transport.price.toFixed(0)}€
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500 pl-6">
          {pkg.transport.duration_hours != null && (
            <span>
              {pkg.transport.duration_hours}
              {t(lang, "hours")}
            </span>
          )}
          {stopsLabel() && <span>{stopsLabel()}</span>}
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-gray-700">
            <Star size={16} className="text-yellow-500" />
            <span className="truncate max-w-[180px]">{pkg.hotel.name}</span>
            {pkg.hotel.rating > 0 && (
              <span className="text-gray-400">{pkg.hotel.rating}★</span>
            )}
          </span>
          <span className="font-semibold">
            {pkg.hotel.price_per_night.toFixed(0)}€{t(lang, "perNight")}
          </span>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <a
          href={pkg.transport.booking_url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex-1 flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition-colors"
        >
          {t(lang, "bookTransport")} <ExternalLink size={14} />
        </a>
        <a
          href={pkg.hotel.booking_url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex-1 flex items-center justify-center gap-1 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium py-2 rounded-lg transition-colors"
        >
          {t(lang, "bookHotel")} <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}