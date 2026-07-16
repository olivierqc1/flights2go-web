// Dictionnaires FR / EN / ES

export type Lang = "fr" | "en" | "es";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

type Dict = { [key: string]: string };

const fr: Dict = {
  title: "Travel2Go",
  tagline: "Où partir avec ton budget?",
  origin: "Ville de départ",
  budget: "Budget total (€)",
  month: "Mois de départ",
  nights: "Nuits",
  transport: "Transport",
  flight: "Avion",
  train: "Train",
  bus: "Bus",
  hotelRating: "Hôtel minimum",
  anyRating: "Toutes",
  search: "Chercher",
  searching: "Recherche en cours...",
  noResults: "Aucun résultat pour ces critères. Essaie un budget plus élevé ou d'autres modes de transport.",
  results: "destinations trouvées",
  perNight: "/nuit",
  total: "Total",
  remaining: "Il te reste",
  bookTransport: "Réserver le transport",
  bookHotel: "Réserver l'hôtel",
  from: "dès",
  stops_0: "Direct",
  stops_1: "1 escale",
  stops_n: "escales",
  hours: "h",
  error: "Erreur de connexion au serveur. Réessaie dans un instant.",
  disclosure: "Liens affiliés : on touche une commission si tu réserves, sans frais pour toi.",
};

const en: Dict = {
  title: "Travel2Go",
  tagline: "Where can your budget take you?",
  origin: "Departure city",
  budget: "Total budget (€)",
  month: "Departure month",
  nights: "Nights",
  transport: "Transport",
  flight: "Flight",
  train: "Train",
  bus: "Bus",
  hotelRating: "Min. hotel rating",
  anyRating: "Any",
  search: "Search",
  searching: "Searching...",
  noResults: "No results for these criteria. Try a higher budget or other transport modes.",
  results: "destinations found",
  perNight: "/night",
  total: "Total",
  remaining: "Left over",
  bookTransport: "Book transport",
  bookHotel: "Book hotel",
  from: "from",
  stops_0: "Direct",
  stops_1: "1 stop",
  stops_n: "stops",
  hours: "h",
  error: "Could not reach the server. Please try again shortly.",
  disclosure: "Affiliate links: we earn a commission if you book, at no cost to you.",
};

const es: Dict = {
  title: "Travel2Go",
  tagline: "¿A dónde te lleva tu presupuesto?",
  origin: "Ciudad de salida",
  budget: "Presupuesto total (€)",
  month: "Mes de salida",
  nights: "Noches",
  transport: "Transporte",
  flight: "Avión",
  train: "Tren",
  bus: "Bus",
  hotelRating: "Hotel mínimo",
  anyRating: "Todos",
  search: "Buscar",
  searching: "Buscando...",
  noResults: "Sin resultados con estos criterios. Prueba con más presupuesto u otros transportes.",
  results: "destinos encontrados",
  perNight: "/noche",
  total: "Total",
  remaining: "Te quedan",
  bookTransport: "Reservar transporte",
  bookHotel: "Reservar hotel",
  from: "desde",
  stops_0: "Directo",
  stops_1: "1 escala",
  stops_n: "escalas",
  hours: "h",
  error: "No se pudo conectar al servidor. Inténtalo de nuevo.",
  disclosure: "Enlaces de afiliados: ganamos una comisión si reservas, sin coste para ti.",
};

const DICTS: Record<Lang, Dict> = { fr, en, es };

export function t(lang: Lang, key: string): string {
  return DICTS[lang][key] ?? DICTS.en[key] ?? key;
}