'use client';

import { useState, useEffect } from 'react';
import { useMounted } from '@/hooks/useMounted';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useMenuStore } from '@/store/useMenuStore';
import { Link, AlertCircle, CheckCircle2, Download, Copy, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { translations } from '@/lib/i18n';
import { useTheme } from 'next-themes';
import { createValidationSchema, FormValues } from '@/lib/validationSchema';
import Image from 'next/image';

/**
 * ÖĞRENME NOTU: Image Optimization
 * Next.js <Image /> bileşeni, görselleri otomatik olarak optimize eder.
 * External API'lerden (QRServer) gelen dinamik görseller için 'unoptimized' veya
 * doğru 'remotePatterns' yapılandırması ile birlikte kullanılır.
 */

export function QRGenerator() {
  const { url, setUrl, isValid, setIsValid, language } = useMenuStore();
  const { theme } = useTheme();
  const [qrUrl, setQrUrl] = useState('');
  const mounted = useMounted();

  const t = translations[language].generator;

  // React Hook Form kurulumu
  const {
    register,
    handleSubmit,
    formState: { errors, isValid: isFormValid },
    watch,
    trigger
  } = useForm<FormValues>({
    resolver: zodResolver(createValidationSchema(language)),
    mode: "onChange", // Anlık kontrol (Kullanıcı yazarken)
    defaultValues: { menuUrl: url }
  });

  const menuUrlValue = watch('menuUrl');

  // Dil değiştiğinde doğrulamayı tekrar tetikle (Hata mesajlarının güncellenmesi için)
  useEffect(() => {
    if (menuUrlValue) trigger('menuUrl');
  }, [language, trigger, menuUrlValue]);

  // Form durumu değiştikçe Zustand ve QR URL'sini güncelle
  useEffect(() => {
    setUrl(menuUrlValue || '');
    setIsValid(isFormValid);

    if (isFormValid && menuUrlValue) {
      const fgColor = theme === 'dark' ? 'f5f5f7' : '0071e3';
      const bgColor = theme === 'dark' ? '1c1c1e' : 'ffffff';
      setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(menuUrlValue)}&color=${fgColor}&bgcolor=${bgColor}&margin=10`);
    } else {
      setQrUrl('');
    }
  }, [menuUrlValue, isFormValid, setUrl, setIsValid, theme]);

  if (!mounted) return null;

  return (
    <section id="generate" className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="premium-card p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">

        {/* Sol Taraf: Input ve Bilgi */}
        <div className="flex-1 space-y-6 w-full">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">{t.title}</h2>
            <p className="text-muted-foreground">{t.description}</p>
          </div>

          <div className="space-y-2">
            <div className="relative group">
              <div className={cn(
                "absolute inset-y-0 left-4 flex items-center pointer-events-none transition-colors",
                errors.menuUrl ? "text-red-500" : "text-muted-foreground group-focus-within:text-primary"
              )}>
                <Link size={20} />
              </div>
              <input
                {...register('menuUrl')}
                type="text"
                placeholder={t.placeholder}
                className={cn(
                  "w-full pl-12 pr-4 py-4 bg-muted/50 border-2 rounded-3xl outline-none transition-all duration-300",
                  errors.menuUrl
                    ? "border-red-400/50 bg-red-50/10 focus:border-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.1)]"
                    : "border-transparent focus:border-primary"
                )}
              />
            </div>

            <AnimatePresence mode="wait">
              {errors.menuUrl && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 text-red-500 text-sm font-medium pl-2"
                >
                  <AlertCircle size={16} />
                  {errors.menuUrl.message}
                </motion.div>
              )}
              {isFormValid && menuUrlValue && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 text-green-500 text-sm font-medium pl-2"
                >
                  <CheckCircle2 size={16} />
                  {t.success}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="pt-4 flex flex-col gap-4">
            <div className="flex gap-3">
              <button
                disabled={!isFormValid}
                className={cn(
                  "flex-1 py-3 px-6 bg-primary text-white font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2",
                  !isFormValid && "opacity-50 cursor-not-allowed"
                )}
              >
                <Share2 size={18} />
                {t.share}
              </button>
              <button className="p-3 bg-accent text-accent-foreground rounded-2xl hover:opacity-80 transition-opacity">
                <Copy size={20} />
              </button>
            </div>

            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                <AlertCircle size={12} />
                {t.driveHelpTitle}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t.driveHelpDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Sağ Taraf: QR Kod Önizleme */}
        <div className="w-full md:w-80 flex flex-col items-center justify-center space-y-6">
          <div className="relative w-64 h-64 bg-card p-4 rounded-[2.5rem] shadow-xl border border-border/50 overflow-hidden">
            <AnimatePresence mode="wait">
              {qrUrl ? (
                <motion.div
                  key={qrUrl}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <Image
                    src={qrUrl}
                    alt="Menu QR Code"
                    width={300}
                    height={300}
                    className="w-full h-full object-contain"
                    priority
                    unoptimized
                  />
                </motion.div>
              ) : (
                <div className="w-full h-full border-2 border-dashed border-muted-foreground/30 rounded-[2rem] flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
                  <div className="mb-4 p-3 bg-muted rounded-full">
                    <Download size={32} className="opacity-20" />
                  </div>
                  <p className="text-xs">{t.emptyHint}</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {qrUrl && (
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              href={qrUrl}
              download="menu-qr-code.png"
              className="text-primary font-semibold flex items-center gap-2 hover:underline"
            >
              <Download size={18} />
              {t.download}
            </motion.a>
          )}
        </div>
      </div>
    </section>
  );
}
