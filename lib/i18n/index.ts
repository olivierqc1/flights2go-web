import fr from "./fr";
import en from "./en";
import es from "./es";

export type Lang = "fr" | "en" | "es";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

const DICTS: Record<Lang, { [key: string]: string }> = { fr, en, es };

export function t(lang: Lang, key: string): string {
  return DICTS[lang][key] ?? DICTS.en[key] ?? key;
}