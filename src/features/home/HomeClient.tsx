'use client';

import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { BentoGrid } from '@/components/organisms/BentoGrid';
import { FeatureCard } from '@/components/molecules/FeatureCard';
import { QRGenerator } from '@/features/qr-generator/QRGenerator';
import { QRScanner } from '@/features/qr-scanner/QRScanner';
import { motion } from 'framer-motion';
import { MousePointer2, Sparkles, Layout } from 'lucide-react';
import { useMenuStore } from '@/store/useMenuStore';
import { translations } from '@/lib/i18n';
import { useMounted } from '@/hooks/useMounted';
import Image from 'next/image';

/**
 * ÖĞRENME NOTU: Client Component Ayırımı
 * Bu bileşen 'use client' direktifi ile işaretlenmiştir çünkü:
 * 1. Zustand (global state) kullanarak dil tercihini yönetir.
 * 2. useMounted ile tarayıcı tarafında hydration kontrolü yapar.
 * 3. Kullanıcı etkileşimi (QR oluşturma/tarama) içeren alt bileşenleri barındırır.
 */
export function HomeClient() {
  const { language } = useMenuStore();
  const mounted = useMounted();
  const t = translations[language].hero;
  const th = translations[language].home;

  if (!mounted) return null;

  const steps = [
    { id: '01', title: th.step1Title, desc: th.step1Desc },
    { id: '02', title: th.step2Title, desc: th.step2Desc },
    { id: '03', title: th.step3Title, desc: th.step3Desc },
  ];

  const featureCards = [
    {
      icon: <Layout size={24} />,
      title: translations[language].creator.title,
      description: translations[language].creator.subtitle,
      href: '/create',
      linkText: th.createNow,
    },
    {
      icon: <Sparkles size={24} />,
      title: translations[language].generator.title,
      description: translations[language].generator.description,
      href: '/generate',
      linkText: th.generateQrCard,
    },
    {
      icon: <MousePointer2 size={24} />,
      title: translations[language].scanner.title,
      description: translations[language].scanner.description,
      href: '/scan',
      linkText: th.testQr,
    },
  ];

  return (
    <main className="min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent -z-10 blur-3xl rounded-full opacity-50" />

        <div className="max-w-7xl mx-auto px-4 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold border border-primary/20 animate-pulse">
            <Sparkles size={16} />
            <span>{t.tag}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.1]">
            {t.title.split(' ').map((word: string, i: number) => (
              word === 'Saniyeler' || word === 'Seconds' ? <span key={i} className="text-primary">{word} </span> : word + ' '
            ))}
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>

          <div className="flex flex-col items-center justify-center gap-6 pt-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <a
                href="/create"
                className="w-full sm:w-auto bg-primary text-white px-10 py-5 rounded-[2rem] text-xl font-black shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
              >
                <Layout size={24} className="group-hover:rotate-6 transition-transform" />
                {translations[language].nav.designMenu}
              </a>
              <a
                href="/generate"
                className="w-full sm:w-auto bg-card text-foreground border-2 border-border px-10 py-5 rounded-[2rem] text-xl font-black shadow-lg hover:bg-accent transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 group"
              >
                <Sparkles size={24} className="text-primary group-hover:animate-spin" />
                {th.generateQr}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium bg-muted/50 px-4 py-2 rounded-full">
              <MousePointer2 size={16} className="text-primary" />
              <span>{t.hint}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo / Process Section */}
      <section className="py-20 relative overflow-hidden bg-white dark:bg-[#0A0A0B]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="premium-card p-1 items-center bg-gradient-to-br from-primary/20 via-transparent to-primary/10 border-none">
            <div className="bg-background/80 backdrop-blur-2xl rounded-[2.9rem] p-8 md:p-16 flex flex-col lg:flex-row gap-16 items-center">
              {/* Left: Content */}
              <div className="flex-1 space-y-10">
                <div>
                  <span className="text-primary font-black uppercase tracking-widest text-sm mb-4 block">
                    {th.howItWorksLabel}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6">
                    {th.publishInSeconds}
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {th.howItWorksDesc}
                  </p>
                </div>

                <div className="space-y-6">
                  {steps.map((step) => (
                    <div key={step.id} className="flex gap-6 group">
                      <span className="text-4xl font-black text-primary/20 group-hover:text-primary transition-colors duration-500">{step.id}</span>
                      <div>
                        <h4 className="text-lg font-bold mb-1">{step.title}</h4>
                        <p className="text-muted-foreground text-sm">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Mockup Image */}
              <div className="flex-1 relative group">
                <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity" />
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/20 border-8 border-background transform hover:scale-[1.02] transition-transform duration-500">
                  {/* next/image: otomatik WebP/AVIF dönüşümü, lazy load, boyut optimizasyonu */}
                  <Image
                    src="/demo-mockup.png"
                    alt="QRMenu nasıl çalışır — menü oluşturma ekranı"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Action Cards */}
      <section className="py-20 bg-accent/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureCards.map((card) => (
              <FeatureCard key={card.href} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Guide */}
      <BentoGrid />

      <Footer />
    </main>
  );
}
