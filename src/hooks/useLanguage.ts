import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'ar' | 'en';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (ar: string, en: string) => string;
}

export const useLanguage = create<LanguageStore>()(
  persist(
    (set, get) => ({
      language: 'ar',
      setLanguage: (lang) => set({ language: lang }),
      t: (ar, en) => (get().language === 'ar' ? ar : en),
    }),
    {
      name: 'bahrain-learn-language',
    }
  )
);
