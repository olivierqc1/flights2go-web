import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, bySlug, cityName, countryName } from "../../../../lib/seo/cities";
import { SEO_TEXTS, SEO_PATHS } from "../../../../lib/seo/texts";
import SeoCityPage from "../../../../components/SeoCityPage";

const LANG = "fr" as const;

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export function generateMetadata(
  { params }: { params: { city: string } }
): Metadata {
  const c = bySlug(params.city);
  if (!c) return {};
  const t = SEO_TEXTS[LANG];
  const name = cityName(c, LANG);
  const path = (l: string) => `/${l}/${SEO_PATHS[l]}/${c.slug}/`;
  return {
    title: t.title(name),
    description: t.meta(name, countryName(c, LANG)),
    alternates: {
      canonical: path(LANG),
      languages: { fr: path("fr"), en: path("en"), es: path("es") },
    },
  };
}

export default function Page({ params }: { params: { city: string } }) {
  const c = bySlug(params.city);
  if (!c) notFound();
  return <SeoCityPage lang={LANG} city={c!} />;
}