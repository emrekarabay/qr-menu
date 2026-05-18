'use client';

import { PageLayout } from '@/components/organisms/PageLayout';
import { useMenuStore } from '@/store/useMenuStore';
import { translations } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Edit3, Share2, QrCode, RefreshCw, Smartphone, Check } from 'lucide-react';

const STEP_ICONS = [
  <Edit3 className="text-primary" size={32} />,
  <Share2 className="text-primary" size={32} />,
  <QrCode className="text-primary" size={32} />,
];

export function HowItWorksClient() {
  const { language } = useMenuStore();
  const t = (translations[language] || translations['tr']).howItWorks as any;

  const setupSteps: { title: string; desc: string; detail: string }[] = t.setupSteps;

  return (
    <PageLayout className="bg-[#F5F5F7] dark:bg-black">
      <section className="flex-1 max-w-6xl mx-auto px-4 py-24 w-full">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-28"
        >
          <span className="bg-primary/10 text-primary px-6 py-2 rounded-full text-xs font-black tracking-[0.2em] uppercase mb-6 inline-block">
            {t.principleLabel}
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
            {t.heroTitle1}<br />
            <span className="text-primary italic">{t.heroTitle2}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
            {t.heroSubtitle}
          </p>
        </motion.div>

        {/* Phase 1: Setup Steps */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="bg-primary text-white w-10 h-10 rounded-2xl flex items-center justify-center text-xl font-black italic shrink-0">1</div>
            <h2 className="text-2xl font-black uppercase tracking-tighter border-b-4 border-primary pb-1">{t.phase1Title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {setupSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-[#1C1C1E] p-8 rounded-[2.5rem] shadow-sm border border-border/50 hover:border-primary/20 transition-all group relative"
              >
                {/* Step number */}
                <div className="absolute -top-4 -left-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-xs font-black">
                  {i + 1}
                </div>

                <div className="w-16 h-16 bg-primary/5 rounded-[1.5rem] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {STEP_ICONS[i]}
                </div>
                <h3 className="text-lg font-black mb-3 uppercase tracking-tight">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-medium mb-4">{step.desc}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 bg-primary/5 px-3 py-1.5 rounded-full inline-block">
                  {step.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Phase 2: The Update Magic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-zinc-900 text-white rounded-[3.5rem] p-10 md:p-16 overflow-hidden mb-32"
        >
          {/* Background blobs */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Left: Text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-5 py-2 rounded-full text-xs font-black tracking-widest uppercase">
                <RefreshCw size={13} className="animate-spin" style={{ animationDuration: '3s' }} />
                {t.phase2Badge}
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight italic">
                {t.phase2Title1}<br />
                <span className="text-green-400">{t.phase2Title2}</span>
              </h2>
              <p className="text-white/60 font-medium leading-relaxed">
                {t.phase2Desc}
              </p>

              {/* How-to steps */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-black uppercase tracking-widest text-white/40">{t.phase2How}</p>
                {(t.phase2Steps as string[]).map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={11} className="text-green-400" />
                    </div>
                    <p className="text-sm font-medium text-white/70 leading-snug">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Tip card */}
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-5">
                <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-black italic text-xs shrink-0">!</div>
                <p className="font-black text-xs uppercase tracking-widest">{t.phase2TipTitle}</p>
              </div>
              <p className="text-sm font-medium leading-relaxed text-white/70 italic">
                "{t.phase2TipText}"
              </p>

              {/* Animated progress bar */}
              <div className="pt-2">
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="h-full bg-green-500 rounded-full"
                  />
                </div>
                <p className="text-[10px] text-center mt-2 font-black text-green-400 uppercase tracking-widest">
                  {t.phase2SyncText}
                </p>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-zinc-700 flex items-center justify-center">
                      <Smartphone size={12} className="text-primary" />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-tight">
                  {language === 'tr' ? '+1000 işletme bu yöntemi kullanıyor' : '1000+ businesses using this method'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase leading-none">
            {t.ctaTitle}
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a
              href="/create"
              className="bg-primary text-white px-12 py-5 rounded-[2rem] font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              {t.ctaCreate}
            </a>
            <a
              href="/generate"
              className="bg-white dark:bg-[#1C1C1E] px-12 py-5 rounded-[2rem] font-black uppercase tracking-widest border border-border hover:bg-muted transition-all"
            >
              {t.ctaQr}
            </a>
          </div>
        </motion.div>

      </section>
    </PageLayout>
  );
}
