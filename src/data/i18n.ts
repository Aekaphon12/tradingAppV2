import en from "./i18n/en.json";
import th from "./i18n/th.json";
import zh from "./i18n/zh.json";
import id from "./i18n/id.json";
import ja from "./i18n/ja.json";
import ko from "./i18n/ko.json";
import ms from "./i18n/ms.json";
import ru from "./i18n/ru.json";
import vi from "./i18n/vi.json";
import zhHant from "./i18n/zhHant.json";

export type Lang = "en" | "th" | "zh" | "id" | "ja" | "ko" | "ms" | "ru" | "vi" | "zhHant";

export const dictionaries: Record<Lang, Record<string, string>> = {
  en,
  th,
  zh,
  id,
  ja,
  ko,
  ms,
  ru,
  vi,
  zhHant
};
