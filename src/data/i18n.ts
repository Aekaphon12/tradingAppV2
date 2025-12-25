import en from "./i18n/en.json";
import th from "./i18n/th.json";
import zh from "./i18n/zh.json";

export type Lang = "en" | "th" | "zh";

export const dictionaries: Record<Lang, Record<string, string>> = {
  en,
  th,
  zh
};
