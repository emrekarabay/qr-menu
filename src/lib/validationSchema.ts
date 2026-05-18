import { z } from 'zod';
import { translations } from './i18n';
import { Language } from '@/store/useMenuStore';

/**
 * ÖĞRENME NOTU: Neden Zod ve React Hook Form birlikte kullanılır?
 * Zod, veri şemasını ve doğrulama kurallarını (validation rules) merkezi ve 
 * tip güvenli bir şekilde tanımlamamızı sağlar. React Hook Form (RHF) ise 
 * formun durumunu (input takibi, hata yönetimi, render optimizasyonu) yönetir. 
 * İkisinin birleşimi, kodun okunabilirliğini artırırken form performansını maksimize eder.
 */
export const createValidationSchema = (lang: Language) => {
  const t = translations[lang].errors;
  
  return z.object({
    menuUrl: z.string()
      .min(1, { message: t.required })
      .url({ message: t.invalidUrl })
  });
};

export type FormValues = {
  menuUrl: string;
};
