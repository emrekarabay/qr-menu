import { ImageResponse } from 'next/og';

export const alt = 'QRMenu — Ücretsiz Dinamik QR Menü Oluşturucu';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * ÖĞRENME NOTU: opengraph-image.tsx nasıl çalışır?
 * Next.js bu dosyayı build anında çalıştırır ve /opengraph-image adresinde
 * PNG olarak sunar. layout.tsx'e og:image metadata'sını otomatik enjekte eder.
 * ImageResponse, JSX → PNG dönüşümünü sunucu tarafında yapar (harici araç gerekmez).
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 90px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Arka plan mavi glow — sağ üst */}
        <div
          style={{
            position: 'absolute',
            top: -160,
            right: -160,
            width: 560,
            height: 560,
            background: 'radial-gradient(circle, rgba(0,113,227,0.35) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Arka plan ikinci glow — sol alt */}
        <div
          style={{
            position: 'absolute',
            bottom: -120,
            left: 200,
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(0,113,227,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* QR desen — sağ alt köşe dekoratif */}
        <div
          style={{
            position: 'absolute',
            bottom: 64,
            right: 80,
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            opacity: 0.07,
          }}
        >
          {[
            [1,1,1,0,1,1,1],
            [1,0,1,0,1,0,1],
            [1,1,1,0,0,1,0],
            [0,0,0,1,0,0,1],
            [1,1,0,0,1,0,1],
            [1,0,1,0,0,1,1],
            [1,1,1,1,0,0,1],
          ].map((row, ri) => (
            <div key={ri} style={{ display: 'flex', gap: 5 }}>
              {row.map((cell, ci) => (
                <div
                  key={ci}
                  style={{
                    width: 26,
                    height: 26,
                    background: cell ? '#ffffff' : 'transparent',
                    borderRadius: 4,
                    border: cell ? 'none' : '2px solid rgba(255,255,255,0.4)',
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 44 }}>
          <div
            style={{
              background: '#0071e3',
              borderRadius: 16,
              width: 56,
              height: 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 5,
            }}
          >
            <div style={{ display: 'flex', gap: 4 }}>
              <div style={{ width: 10, height: 10, background: '#fff', borderRadius: 2 }} />
              <div style={{ width: 10, height: 10, background: 'rgba(255,255,255,0.5)', borderRadius: 2 }} />
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <div style={{ width: 10, height: 10, background: 'rgba(255,255,255,0.5)', borderRadius: 2 }} />
              <div style={{ width: 10, height: 10, background: '#fff', borderRadius: 2 }} />
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 36, fontWeight: 900, letterSpacing: '-0.02em' }}>
            <span style={{ color: '#ffffff' }}>QR</span>
            <span style={{ color: '#0071e3' }}>Menu</span>
          </div>
        </div>

        {/* Rozet */}
        <div
          style={{
            background: 'rgba(0,113,227,0.15)',
            border: '1px solid rgba(0,113,227,0.35)',
            borderRadius: 50,
            padding: '10px 24px',
            color: '#60a5fa',
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 36,
            display: 'flex',
          }}
        >
          Ücretsiz · Üyeliksiz · Veri Vermeden
        </div>

        {/* Ana başlık */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 28,
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            fontWeight: 900,
          }}
        >
          <span style={{ color: '#ffffff', fontSize: 70 }}>Dinamik QR Menü</span>
          <span style={{ color: '#0071e3', fontSize: 70 }}>Oluşturucu</span>
        </div>

        {/* Alt yazı */}
        <div
          style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: 22,
            lineHeight: 1.55,
            fontWeight: 400,
            display: 'flex',
          }}
        >
          Menünüzü oluşturun, Google Drive'a yükleyin, QR kodunuzu alın. Masadaki kodlar hiç değişmez.
        </div>

        {/* Alt mavi çizgi */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #0071e3 0%, rgba(0,113,227,0.2) 60%, transparent 100%)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
