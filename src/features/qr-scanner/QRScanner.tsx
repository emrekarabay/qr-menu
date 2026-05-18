'use client';

import { useRef, useState, useEffect } from 'react';
import { useMounted } from '@/hooks/useMounted';
import { useScanner } from '@/hooks/useScanner';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, RefreshCw, ExternalLink } from 'lucide-react';
import { useMenuStore } from '@/store/useMenuStore';
import { translations } from '@/lib/i18n';

/**
 * Neden BarcodeDetector Kullandık?
 * Harici kütüphanelere (jsQR vb.) ihtiyaç duymadan, modern tarayıcıların sunduğu
 * yerleşik ve yüksek performanslı QR okuma yeteneğini kullanmak için.
 */
export function QRScanner() {
  const { language } = useMenuStore();
  const t = translations[language].scanner;
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isScanning, scannedResult, error, startScan, stopScan, setScannedResult } = useScanner();
  const [showScanner, setShowScanner] = useState(false);
  const mounted = useMounted();

  // Modal açıldığında kamerayı başlat
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (showScanner && videoRef.current) {
      timeoutId = setTimeout(async () => {
        try {
          await startScan(videoRef.current!);
        } catch (err) {
          console.error('Scan start error:', err);
        }
      }, 300); // Modal animasyonunun tamamlanması için biraz daha süre ver
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [showScanner, startScan]);

  const handleStart = () => {
    setShowScanner(true);
  };

  const handleClose = () => {
    stopScan();
    setShowScanner(false);
    setScannedResult(null);
  };

  if (!mounted) return null;

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="premium-card p-8 bg-accent/30 border-accent/20 overflow-hidden relative">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h3 className="text-2xl font-bold">{t.title}</h3>
            <p className="text-muted-foreground">
              {t.description}
            </p>
            <button
              onClick={handleStart}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition-all"
            >
              <Camera size={20} />
              {t.button}
            </button>
          </div>

          <div className="w-48 h-48 bg-card rounded-3xl border-4 border-dashed border-primary/20 flex items-center justify-center relative">
            <Camera size={48} className="text-primary/20" />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent rounded-2xl" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showScanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-lg flex items-center justify-center p-4"
          >
            <div className="bg-card w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative">
              <div className="p-4 border-b flex justify-between items-center">
                <h4 className="font-bold">{t.title}</h4>
                <button onClick={handleClose} className="p-2 hover:bg-muted rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="relative aspect-square bg-black">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  playsInline
                />
                {/* Tarama Çizgisi Animasyonu */}
                {isScanning && !scannedResult && (
                  <motion.div
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_15px_rgba(99,102,241,0.8)] z-10"
                  />
                )}

                {scannedResult && (
                  <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center backdrop-blur-sm">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-card p-6 rounded-2xl shadow-xl max-w-[80%] text-center"
                    >
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{t.result}</p>
                      <p className="font-mono text-sm break-all mb-4">{scannedResult}</p>
                      <div className="flex gap-2">
                        <a
                          href={scannedResult}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 bg-primary text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2"
                        >
                          <ExternalLink size={14} /> {t.go}
                        </a>
                        <button
                          onClick={async () => {
                            setScannedResult(null);
                            if (videoRef.current) {
                              await startScan(videoRef.current);
                            }
                          }}
                          className="p-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                        >
                          <RefreshCw size={18} />
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>

              {error && (
                <div className="p-6 text-center">
                  <p className="text-red-500 mb-4">{error}</p>
                  <button onClick={handleClose} className="text-primary font-semibold underline">{t.close}</button>
                </div>
              )}

              {!scannedResult && (
                <div className="p-4 text-center text-sm text-muted-foreground italic">
                  {t.scanLine}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
