"use client";

import { t, Lang, LANGS } from "../lib/i18n";

interface Props {
  lang: Lang;
  onLangChange: (l: Lang) => void;
}

export default function Header({ lang, onLangChange }: Props) {
  return (
    <header className="flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-extrabold text-blue-600">
          {t(lang, "title")}
        </h1>
        <p className="text-gray-500">{t(lang, "tagline")}</p>
      </div>
      <div className="flex gap-1">
        {LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => onLangChange(l.code)}
            className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
              lang === l.code
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-500 border border-gray-200"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </header>
  );
}