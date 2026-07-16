"use client";

import { Compass } from "lucide-react";
import { t, Lang, LANGS } from "../lib/i18n";

interface Props {
  lang: Lang;
  onLangChange: (l: Lang) => void;
}

export default function Header({ lang, onLangChange }: Props) {
  return (
    <header className="flex items-start justify-between">
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-extrabold tracking-tight">
          <span className="p-2 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200">
            <Compass size={22} />
          </span>
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            {t(lang, "title")}
          </span>
        </h1>
        <p className="text-slate-500 mt-1">{t(lang, "tagline")}</p>
      </div>
      <div className="flex gap-1 bg-white/70 backdrop-blur rounded-full p-1 shadow-sm">
        {LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => onLangChange(l.code)}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
              lang === l.code
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-500"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </header>
  );
}