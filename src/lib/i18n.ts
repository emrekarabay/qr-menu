import tr from '@/data/locales-tr.json';
import en from '@/data/locales-en.json';

/**
 * ÖĞRENME NOTU: JSON ile i18n Yönetimi (Maintainability)
 * 1. Kod Temizliği: Metinler kodun içinden (hard-coded) çıkarılarak JSON dosyalarına taşınır.
 * 2. Kolay Bakım: Yeni bir dil eklemek veya bir metni değiştirmek için koda dokunmadan sadece JSON dosyası güncellenir.
 * 3. Merkezi Yönetim: Tüm uygulamadaki metinler tek bir noktadan yönetilir, bu da büyük projelerde karmaşayı önler.
 */
export const translations = { tr, en };

export type TranslationType = typeof tr;
export type Language = 'tr' | 'en';
