import type { SearchFormValues } from "../app/page";

export function valuesToQuery(v: SearchFormValues): string {
  const p = new URLSearchParams({
    o: v.origin,
    b: String(v.budget),
    c: v.currency,
    m: v.month,
    n: String(v.nights),
    t: String(v.travelers),
    tt: v.tripType,
    tm: v.transportModes.join(","),
    bg: String(v.bags),
    a: v.accommodationType,
  });
  if (v.excludeCountries.length) p.set("x", v.excludeCountries.join("|"));
  return p.toString();
}

export function queryToValues(): SearchFormValues | null {
  if (typeof window === "undefined") return null;
  const q = new URLSearchParams(window.location.search);
  if (!q.get("o") || !q.get("b")) return null;
  return {
    origin: q.get("o") || "BCN",
    budget: Number(q.get("b")) || 500,
    currency: q.get("c") || "EUR",
    month: q.get("m") || "",
    nights: Number(q.get("n")) || 4,
    travelers: Number(q.get("t")) || 1,
    tripType: q.get("tt") || "month",
    transportModes: (q.get("tm") || "flight,train,bus").split(","),
    minHotelRating: 0,
    bags: Number(q.get("bg")) || 0,
    accommodationType: q.get("a") || "hotel",
    excludeCountries: q.get("x") ? q.get("x")!.split("|") : [],
  };
}

export function writeQuery(v: SearchFormValues) {
  if (typeof window === "undefined") return;
  const url = `${window.location.pathname}?${valuesToQuery(v)}`;
  window.history.replaceState(null, "", url);
}