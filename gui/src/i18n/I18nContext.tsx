import React, { createContext, useContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../util/localStorage";
import { Language, TranslationKey, translations } from "./translations";

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Устанавливаем русский язык по умолчанию
  const [language, setLanguage] = useState<Language>("ru");

  useEffect(() => {
    // Загружаем сохраненный язык из localStorage
    const savedLanguage = getLocalStorage("language") as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    } else {
      // Если языка нет в localStorage, устанавливаем русский по умолчанию
      setLocalStorage("language", "ru");
      setLanguage("ru");
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    setLocalStorage("language", lang);
  };

  const t = (key: TranslationKey, fallback?: string): string => {
    const translation = translations[language]?.[key];
    if (translation) {
      return translation;
    }

    // Fallback на английский если перевода нет
    const englishTranslation = translations["en"][key];
    if (englishTranslation) {
      return englishTranslation;
    }

    // Если нет перевода вообще, возвращаем fallback или сам ключ
    return fallback || key;
  };

  return (
    <I18nContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};

// Хук для быстрого доступа к функции перевода
export const useTranslation = () => {
  const { t } = useI18n();
  return { t };
};
