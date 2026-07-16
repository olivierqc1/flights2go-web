// Client API Travel2Go

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface TransportInfo {
  mode: "flight" | "train" | "bus";
  price: number;
  duration_hours: number | null;
  stops: number | null;
  carrier: string | null;
  booking_url: string;
}

export interface HotelInfo {
  name: string;
  price_per_night: number;
  total_price: number;
  rating: number;
  booking_url: string;
}

export interface TravelPackage {
  destination: string;
  country: string;
  code: string;
  flag: string;
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
  month: string;
  nights: number;
  lang: string;
  transportModes: string[];
  minHotelRating: number;
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
      month: p.month,
      nights: p.nights,
      lang: p.lang,
      filters: {
        transportModes: p.transportModes,
        maxStops: -1,
        maxTravelHours: -1,
        minHotelRating: p.minHotelRating,
      },
    }),
  });
  if (!r.ok) throw new Error("API error");
  return r.json();
}