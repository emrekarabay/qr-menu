import { create } from 'zustand';

export type Language = 'tr' | 'en';

interface MenuState {
  url: string;
  isValid: boolean;
  language: Language;
  setUrl: (url: string) => void;
  setIsValid: (isValid: boolean) => void;
  setLanguage: (lang: Language) => void;
}

/**
 * ÖĞRENME NOTU: Neden Zustand ile dil tercihini global hale getirdik?
 * 1. Anlık Değişim: Dil değiştiğinde tüm uygulama render edilmeden sadece ilgili metinler güncellenir.
 * 2. SEO Avantajı: i18n yapısını client-side state ile yönetmek, tek bir URL üzerinden 
 *    farklı diller sunmamızı sağlar. Ancak tam SEO için Next.js'in middleware tabanlı 
 *    veya /en, /tr şeklinde URL yönlendirmeli yapısı (Server-side i18n) daha avantajlıdır.
 * 3. Hafif Yapı: Context API'ın aksine karmaşık provider sarmallarına gerek duymaz.
 */
export const useMenuStore = create<MenuState>((set) => ({
  url: '',
  isValid: false,
  language: 'tr',
  setUrl: (url) => set({ url }),
  setIsValid: (isValid) => set({ isValid }),
  setLanguage: (language) => set({ language }),
}));

