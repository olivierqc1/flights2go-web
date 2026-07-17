// Contenu des pages SEO — templates par langue

export const SEO_PATHS: Record<string, string> = {
  fr: "weekend-pas-cher",
  en: "cheap-weekend",
  es: "fin-de-semana-barato",
};

interface SeoTexts {
  title: (city: string) => string;
  meta: (city: string, country: string) => string;
  h1: (city: string) => string;
  intro: (city: string, country: string) => string;
  how: string;
  steps: string[];
  cta: (city: string) => string;
  otherTitle: (city: string) => string;
  otherLink: (city: string) => string;
  faqTitle: string;
  faq: (city: string) => { q: string; a: string }[];
  home: string;
}

export const SEO_TEXTS: Record<string, SeoTexts> = {
  fr: {
    title: (c) => `Week-end pas cher depuis ${c} — vol, train ou bus + hôtel`,
    meta: (c, p) =>
      `Où partir en week-end depuis ${c} (${p}) avec un petit budget? Compare avion, train et bus + hébergement, selon ton budget total. Gratuit, sans inscription.`,
    h1: (c) => `Week-end pas cher depuis ${c}`,
    intro: (c, p) =>
      `Tu pars de ${c}, t'as un budget fixe pis tu veux savoir où il peut te mener? Flight2Go compare les vols, les trains pis les bus au départ de ${c} (${p}), ajoute une estimation d'hébergement, pis te montre seulement les destinations qui rentrent dans ton budget total — transport et dodo inclus.`,
    how: "Comment ça marche",
    steps: [
      "Entre ta ville de départ pis ton budget total pour le week-end.",
      "On compare avion, train et bus vers toute l'Europe, avec les dates de week-end les moins chères.",
      "Tu vois le coût complet (transport + hébergement) pis ce qui te reste pour profiter sur place.",
    ],
    cta: (c) => `Trouver mon week-end depuis ${c}`,
    otherTitle: () => "Autres villes de départ",
    otherLink: (c) => `Week-end depuis ${c}`,
    faqTitle: "Questions fréquentes",
    faq: (c) => [
      {
        q: `Quel budget prévoir pour un week-end depuis ${c}?`,
        a: `Ça dépend de la destination, mais avec 200 à 400 € par personne (transport + hébergement), plusieurs villes européennes sont accessibles depuis ${c}, surtout en réservant quelques semaines d'avance ou en partant en train ou en bus.`,
      },
      {
        q: "Les prix affichés sont-ils exacts?",
        a: "Les prix des vols viennent de données de recherche réelles et récentes. Les prix train/bus sont des minimums typiques, pis l'hébergement est une estimation basée sur ton budget. Le prix final se confirme chez le vendeur au moment de réserver.",
      },
      {
        q: "C'est vraiment gratuit?",
        a: "Oui. Flight2Go est gratuit et sans inscription. On touche parfois une commission d'affiliation si tu réserves via nos liens, sans aucun coût supplémentaire pour toi.",
      },
    ],
    home: "← Flight2Go — toutes les recherches",
  },
  en: {
    title: (c) => `Cheap weekend from ${c} — flight, train or bus + hotel`,
    meta: (c, p) =>
      `Where can you go for a weekend from ${c} (${p}) on a budget? Compare flights, trains and buses + accommodation within your total budget. Free, no sign-up.`,
    h1: (c) => `Cheap weekend trips from ${c}`,
    intro: (c, p) =>
      `Leaving from ${c} with a fixed budget and wondering how far it can take you? Flight2Go compares flights, trains and buses from ${c} (${p}), adds an accommodation estimate, and only shows destinations that fit your total budget — transport and stay included.`,
    how: "How it works",
    steps: [
      "Enter your departure city and your total weekend budget.",
      "We compare flights, trains and buses across Europe, using the cheapest weekend dates.",
      "You see the full cost (transport + stay) and what's left to enjoy the trip.",
    ],
    cta: (c) => `Find my weekend from ${c}`,
    otherTitle: () => "Other departure cities",
    otherLink: (c) => `Weekend from ${c}`,
    faqTitle: "Frequently asked questions",
    faq: (c) => [
      {
        q: `What budget do I need for a weekend from ${c}?`,
        a: `It depends on the destination, but with €200–400 per person (transport + stay), many European cities are reachable from ${c}, especially booking a few weeks ahead or travelling by train or bus.`,
      },
      {
        q: "Are the prices accurate?",
        a: "Flight prices come from real, recent search data. Train and bus prices are typical minimums, and accommodation is an estimate based on your budget. The final price is confirmed by the seller when you book.",
      },
      {
        q: "Is it really free?",
        a: "Yes. Flight2Go is free and requires no sign-up. We may earn an affiliate commission if you book through our links, at no extra cost to you.",
      },
    ],
    home: "← Flight2Go — all searches",
  },
  es: {
    title: (c) => `Fin de semana barato desde ${c} — vuelo, tren o bus + hotel`,
    meta: (c, p) =>
      `¿A dónde ir un fin de semana desde ${c} (${p}) con poco presupuesto? Compara vuelos, trenes y buses + alojamiento dentro de tu presupuesto total. Gratis y sin registro.`,
    h1: (c) => `Fin de semana barato desde ${c}`,
    intro: (c, p) =>
      `¿Sales de ${c} con un presupuesto fijo y quieres saber hasta dónde te puede llevar? Flight2Go compara vuelos, trenes y buses desde ${c} (${p}), añade una estimación de alojamiento y muestra solo los destinos que caben en tu presupuesto total — transporte y alojamiento incluidos.`,
    how: "Cómo funciona",
    steps: [
      "Indica tu ciudad de salida y tu presupuesto total para el fin de semana.",
      "Comparamos vuelos, trenes y buses por toda Europa, con las fechas de fin de semana más baratas.",
      "Ves el coste completo (transporte + alojamiento) y lo que te queda para disfrutar.",
    ],
    cta: (c) => `Buscar mi fin de semana desde ${c}`,
    otherTitle: () => "Otras ciudades de salida",
    otherLink: (c) => `Fin de semana desde ${c}`,
    faqTitle: "Preguntas frecuentes",
    faq: (c) => [
      {
        q: `¿Qué presupuesto necesito para un fin de semana desde ${c}?`,
        a: `Depende del destino, pero con 200–400 € por persona (transporte + alojamiento) muchas ciudades europeas son accesibles desde ${c}, sobre todo reservando con semanas de antelación o viajando en tren o bus.`,
      },
      {
        q: "¿Los precios son exactos?",
        a: "Los precios de vuelos provienen de datos de búsqueda reales y recientes. Los de tren y bus son mínimos típicos, y el alojamiento es una estimación según tu presupuesto. El precio final se confirma en la web del vendedor al reservar.",
      },
      {
        q: "¿Es realmente gratis?",
        a: "Sí. Flight2Go es gratuito y sin registro. Podemos ganar una comisión de afiliado si reservas con nuestros enlaces, sin coste adicional para ti.",
      },
    ],
    home: "← Flight2Go — todas las búsquedas",
  },
};