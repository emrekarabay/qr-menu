# QRMenu — Ücretsiz Dinamik QR Menü Oluşturucu

Hesap açmadan, veri vermeden. Menünüzü oluşturun, Google Drive'a yükleyin, QR kodunuzu alın.

## Özellikler

- **Menü Oluşturucu** — Kategori ve ürün bazlı sürükle-bırak editör. Görsel, fiyat, kalori, alerjen, stok durumu desteği
- **QR Kod Üretici** — URL'yi gir, anında QR oluştur. Tema rengine uyumlu (koyu/açık mod)
- **QR Tarayıcı** — Harici kütüphane kullanmadan yerleşik `BarcodeDetector` API ile kamera taraması
- **Sıfır Veri** — Hiçbir şey sunucuya gönderilmez. Veriler tarayıcıda kalır
- **Çok Dil** — TR / EN anlık dil değiştirme
- **PDF / Baskı** — Menüyü tek tıkla yazdır veya PDF olarak kaydet
- **Dışa / İçe Aktar** — Menüyü `.txt` dosyası olarak yedekle ve geri yükle

## Tech Stack

| Katman | Teknoloji |
|---|---|
| Framework | Next.js 16 (App Router) |
| Dil | TypeScript 5 |
| Stil | Tailwind CSS v4 |
| State | Zustand |
| Form | React Hook Form + Zod |
| Animasyon | Framer Motion |
| İkonlar | Lucide React |
| Tema | next-themes |
| QR Oluşturma | QRServer API (harici kütüphane yok) |
| QR Okuma | BarcodeDetector API (yerleşik) |

## Mimari

Feature-based Atomic Design yapısı:

```
src/
├── app/                        # Next.js sayfa rotaları (yalnızca metadata)
├── components/
│   ├── atoms/                  # En küçük bağımsız birimler
│   │   ├── Icon.tsx
│   │   └── ThemeProvider.tsx
│   ├── molecules/              # Atom kombinasyonları
│   │   ├── FeatureCard.tsx
│   │   ├── LanguageToggle.tsx
│   │   └── ThemeToggle.tsx
│   └── organisms/              # Karmaşık UI bölümleri
│       ├── BentoGrid.tsx
│       ├── Footer.tsx
│       ├── Header.tsx
│       └── PageLayout.tsx
├── features/                   # Domain bazlı modüller
│   ├── home/
│   ├── menu-creator/
│   ├── qr-generator/
│   ├── qr-scanner/
│   ├── contact/
│   ├── features-page/
│   ├── how-it-works/
│   └── static-pages/
├── hooks/                      # useMounted, useScanner
├── store/                      # Zustand store
├── lib/                        # utils, i18n, validationSchema
└── data/                       # locales-tr.json, locales-en.json
```

## Kurulum

```bash
bun install
bun dev
```

Uygulama `http://localhost:3000` adresinde çalışır.

## Build

```bash
bun run build
```

## Geliştirici

**Emre Karabay** — [github.com/emrekarabay](https://github.com/emrekarabay)
