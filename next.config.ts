import type { NextConfig } from "next";

const securityHeaders = [
  // Clickjacking koruması — iframe içinde açılmasını engeller
  { key: 'X-Frame-Options', value: 'DENY' },
  // MIME sniffing koruması
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // DNS prefetch'i açık bırak, performansa katkı sağlar
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  // Referrer bilgisini yalnızca aynı origin'de tam gönder
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // HTTPS zorunlu kıl (1 yıl, subdomain dahil) — yalnızca prod'da anlamlı
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  // Kamera/mikrofon/coğrafi konum izinlerini kısıtla
  { key: 'Permissions-Policy', value: 'camera=(self), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
        pathname: '/**',
      },
    ],
    // WebP/AVIF dönüşümü için kalite hedefi
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
