// Page SEO statique par ville — composant serveur partagé FR/EN/ES

import Link from "next/link";
import { CITIES, SeoCity, cityName, countryName } from "../lib/seo/cities";
import { SEO_TEXTS, SEO_PATHS } from "../lib/seo/texts";

interface Props {
  lang: "fr" | "en" | "es";
  city: SeoCity;
}

export default function SeoCityPage({ lang, city }: Props) {
  const t = SEO_TEXTS[lang];
  const name = cityName(city, lang);
  const country = countryName(city, lang);
  const searchUrl = `/?o=${city.code}&b=350&tt=weekend&n=2&t=1`;

  // 8 autres villes pour le maillage interne (rotation selon l'index)
  const idx = CITIES.findIndex((c) => c.code === city.code);
  const others = Array.from({ length: 8 }, (_, i) =>
    CITIES[(idx + 1 + i * 6) % CITIES.length]
  ).filter((c) => c.code !== city.code);

  return (
    <main className="min-h-screen max-w-3xl mx-auto px-4 py-10 space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold text-indigo-600">
          Flight2Go · {country} {city.flag}
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight">
          {t.h1(name)}
        </h1>
        <p className="text-slate-600 leading-relaxed">
          {t.intro(name, country)}
        </p>
        <Link
          href={searchUrl}
          className="inline-block bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-indigo-200"
        >
          {t.cta(name)} →
        </Link>
      </header>

      <section className="bg-white/80 backdrop-blur rounded-3xl shadow-lg shadow-slate-200/60 p-6 space-y-4">
        <h2 className="text-xl font-bold">{t.how}</h2>
        <ol className="space-y-3">
          {t.steps.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-none w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-slate-600">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">{t.faqTitle}</h2>
        {t.faq(name).map((f, i) => (
          <details
            key={i}
            className="bg-white/80 backdrop-blur rounded-2xl shadow-sm p-4"
          >
            <summary className="font-semibold text-slate-800 cursor-pointer">
              {f.q}
            </summary>
            <p className="text-slate-600 mt-2 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">{t.otherTitle(name)}</h2>
        <div className="flex flex-wrap gap-2">
          {others.map((c) => (
            <Link
              key={c.code}
              href={`/${lang}/${SEO_PATHS[lang]}/${c.slug}/`}
              className="px-3 py-1.5 rounded-full bg-white/80 border border-slate-200 text-sm text-slate-600 hover:border-indigo-300"
            >
              {c.flag} {t.otherLink(cityName(c, lang))}
            </Link>
          ))}
        </div>
      </section>

      <footer className="pt-4">
        <Link href="/" className="text-sm text-indigo-600 font-semibold">
          {t.home}
        </Link>
      </footer>
    </main>
  );
}