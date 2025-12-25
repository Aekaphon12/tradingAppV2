import React, { createContext, useContext } from "react";
import { dictionaries, Lang } from "../data/i18n";
import { useAppState } from "./AppState";

type I18nContext = {
  t: (key: string) => string;
  lang: Lang;
};

const I18nContext = createContext<I18nContext | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lang } = useAppState();
  const t = (key: string) => dictionaries[lang][key] || key;
  return <I18nContext.Provider value={{ t, lang }}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
};
