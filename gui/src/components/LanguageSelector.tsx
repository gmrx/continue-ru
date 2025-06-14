import { useI18n } from "../i18n/I18nContext";
import { Language } from "../i18n/translations";

interface LanguageSelectorProps {
  className?: string;
}

export function LanguageSelector({ className = "" }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useI18n();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-gray-600">{t("Language")}:</span>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="bg-vsc-input-background border-vsc-input-border text-vsc-foreground focus:ring-vsc-focusBorder rounded border px-2 py-1 text-sm focus:outline-none focus:ring-1"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
