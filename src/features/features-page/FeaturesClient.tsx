'use client';

import { PageLayout } from '@/components/organisms/PageLayout';
import { useMenuStore } from '@/store/useMenuStore';
import { translations } from '@/lib/i18n';
import { motion } from 'framer-motion';
import {
  UtensilsCrossed, RefreshCw, Lock,
  FileDown, ScanLine, Archive, Zap, Check, X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const FEATURE_ICONS = [
  <UtensilsCrossed size={32} />,
  <RefreshCw size={32} />,
  <Lock size={32} />,
  <FileDown size={32} />,
  <ScanLine size={32} />,
  <Archive size={32} />,
];

const FEATURE_GRADIENTS = [
  'from-blue-500 to-indigo-600',
  'from-green-500 to-emerald-600',
  'from-orange-500 to-red-500',
  'from-violet-500 to-purple-600',
  'from-cyan-500 to-sky-600',
  'from-amber-500 to-yellow-500',
];

export function FeaturesClient() {
  const { language } = useMenuStore();
  const t = translations[language].features;

  const featureKeys = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'] as const;

  const features = featureKeys.map((key, i) => ({
    title: (t as any)[key],
    desc: (t as any)[`${key}Desc`],
    tag: (t as any)[`${key}Tag`],
    icon: FEATURE_ICONS[i],
    gradient: FEATURE_GRADIENTS[i],
  }));

  const comp = (t as any).comparison;

  return (
    <PageLayout>
      <section className="flex-1 max-w-7xl mx-auto px-4 py-24 w-full">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black tracking-[0.2em] uppercase mb-4 inline-block">
            {(t as any).tag}
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">{t.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">{t.subtitle}</p>
        </motion.div>

        {/* 6 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group bg-white dark:bg-[#1C1C1E] rounded-[2.5rem] p-8 shadow-sm border border-border/50 hover:border-primary/20 transition-all relative overflow-hidden"
            >
              {/* Background glow */}
              <div className={cn(
                "absolute -right-10 -top-10 w-40 h-40 blur-3xl opacity-0 group-hover:opacity-10 rounded-full bg-gradient-to-br transition-opacity duration-500",
                f.gradient
              )} />

              <div className="flex items-start gap-6 relative z-10">
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center text-white shrink-0 bg-gradient-to-br shadow-lg group-hover:scale-110 transition-transform duration-300",
                  f.gradient
                )}>
                  {f.icon}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl font-black tracking-tight">{f.title}</h3>
                    <span className="text-[9px] font-black uppercase tracking-widest bg-primary/8 text-primary px-2.5 py-1 rounded-full border border-primary/15">
                      {f.tag}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed font-medium">{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-3">{comp.title}</h2>
            <p className="text-muted-foreground font-medium">{comp.subtitle}</p>
          </div>

          <div className="bg-white dark:bg-[#1C1C1E] rounded-[2.5rem] border border-border/50 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 border-b border-border/50">
              <div className="p-5" />
              {comp.headers.map((h: string, i: number) => (
                <div
                  key={i}
                  className={cn(
                    "p-5 text-center text-xs font-black uppercase tracking-widest border-l border-border/50",
                    i === 2
                      ? "bg-primary text-white"
                      : "text-muted-foreground"
                  )}
                >
                  {i === 2 && <Zap size={14} className="inline-block mr-1 -mt-0.5" />}
                  {h}
                </div>
              ))}
            </div>

            {/* Rows */}
            {comp.rows.map((row: any, ri: number) => (
              <div
                key={ri}
                className={cn(
                  "grid grid-cols-4 border-b border-border/30 last:border-0",
                  ri % 2 === 0 ? "" : "bg-muted/20"
                )}
              >
                <div className="p-5 text-xs font-black uppercase tracking-widest text-muted-foreground">{row.label}</div>
                {row.values.map((val: string, vi: number) => (
                  <div
                    key={vi}
                    className={cn(
                      "p-5 text-sm font-medium border-l border-border/30 flex items-center gap-2",
                      vi === 2 ? "bg-primary/5 text-primary font-black" : "text-muted-foreground"
                    )}
                  >
                    {vi === 2
                      ? <Check size={14} className="shrink-0 text-primary" />
                      : <X size={14} className="shrink-0 opacity-30" />
                    }
                    <span className="text-xs leading-tight">{val}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="/create"
            className="inline-flex items-center gap-3 bg-foreground text-background px-10 py-5 rounded-3xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl uppercase tracking-widest"
          >
            <Zap size={22} fill="currentColor" />
            {t.ctaButton}
          </a>
        </motion.div>

      </section>
    </PageLayout>
  );
}
