// Client API Travel2Go

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const CURRENCIES = [
  "EUR", "USD", "CAD", "GBP", "CHF", "PLN", "SEK", "CZK", "DKK",
] as const;

export function fmtMoney(amount: number, currency: string, lang: string): string {
  const locale = lang === "en" ? "en-GB" : lang === "es" ? "es-ES" : "fr-FR";
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${Math.round(amount)} ${currency}`;
  }
}

export interface TransportInfo {
  mode: "flight" | "train" | "bus";
  price: number;
  duration_hours: number | null;
  stops: number | null;
  carrier: string | null;
  departure_date: string | null;
  booking_url: string;
}

export interface HotelInfo {
  name: string;
  price_per_night: number;
  total_price: number;
  rating: number;
  booking_url: string;
  alt_booking_url: string | null;
}

export interface TravelPackage {
  destination: string;
  country: string;
  code: string;
  flag: string;
  currency: string;
  transport: TransportInfo;
  hotel: HotelInfo;
  total_cost: number;
  budget_remaining: number;
  savings_pct: number;
}

export interface Destination {
  code: string;
  name: string;
  country: string;
  flag: string;
  slug: string;
}

export interface SearchParams {
  origin: string;
  budget: number;
  currency: string;
  month: string;
  nights: number;
  travelers: number;
  tripType: string;
  lang: string;
  transportModes: string[];
  minHotelRating: number;
  bags: number;
  accommodationType: string;
  excludeCountries: string[];
}

export async function fetchDestinations(lang: string): Promise<Destination[]> {
  const r = await fetch(`${API_URL}/destinations?lang=${lang}`);
  if (!r.ok) throw new Error("API error");
  return r.json();
}

export async function searchPackages(
  p: SearchParams
): Promise<TravelPackage[]> {
  const r = await fetch(`${API_URL}/search/packages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      origin: p.origin,
      budget: p.budget,
      currency: p.currency,
      month: p.month,
      nights: p.nights,
      travelers: p.travelers,
      tripType: p.tripType,
      lang: p.lang,
      filters: {
        transportModes: p.transportModes,
        maxStops: -1,
        maxTravelHours: -1,
        bags: p.bags,
        accommodationType: p.accommodationType,
        excludeCountries: p.excludeCountries,
        minHotelRating: p.minHotelRating,
      },
    }),
  });
  if (!r.ok) throw new Error("API error");
  return r.json();
}