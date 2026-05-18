'use client';

import { FileText, Cloud, RefreshCw, Zap, Smartphone, Globe } from 'lucide-react';
import { useMenuStore } from '@/store/useMenuStore';
import { translations } from '@/lib/i18n';

/**
 * Bento Grid Yapısı
 * Modern tasarımlarda bilgiyi parçalara ayırarak sunmak için Bento Grid kullanılır.
 * Apple ve Linear gibi markaların popüler hale getirdiği bu stil,
 * okuma kolaylığı ve estetik sağlar.
 */
export function BentoGrid() {
  const { language } = useMenuStore();
  const t = translations[language].bento;

  const steps = [
    {
      title: t.step1.title,
      description: t.step1.desc,
      icon: <FileText className="text-blue-500" />,
      className: "md:col-span-2 md:row-span-1",
      color: "bg-blue-500/5"
    },
    {
      title: t.step5.title,
      description: t.step5.desc,
      icon: <Smartphone className="text-rose-500" />,
      className: "md:col-span-1 md:row-span-2",
      color: "bg-rose-500/5"
    },
    {
      title: t.step3.title,
      description: t.step3.desc,
      icon: <RefreshCw className="text-emerald-500" />,
      className: "md:col-span-1 md:row-span-1",
      color: "bg-emerald-500/5"
    },
    {
      title: t.step4.title,
      description: t.step4.desc,
      icon: <Zap className="text-amber-500" />,
      className: "md:col-span-1 md:row-span-1",
      color: "bg-amber-500/5"
    },
    {
      title: t.step2.title,
      description: t.step2.desc,
      icon: <Cloud className="text-purple-500" />,
      className: "md:col-span-3 md:row-span-1",
      color: "bg-purple-500/5"
    }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold tracking-tight mb-4">{t.title}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`premium-card p-8 flex flex-col gap-6 group hover:scale-[1.02] transition-all ${step.className} ${step.color}`}
          >
            <div className="p-3 bg-card rounded-2xl w-fit shadow-sm group-hover:shadow-md transition-shadow">
              {step.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 premium-card p-10 bg-primary/5 border-primary/10 overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4">{t.caseStudy.title}</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            "{t.caseStudy.quote}"
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
              {t.caseStudy.author.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div>
              <p className="font-bold">{t.caseStudy.author}</p>
              <p className="text-sm text-muted-foreground">{t.caseStudy.role}</p>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 opacity-5 transform rotate-12">
          <Globe size={300} />
        </div>
      </div>
    </section>
  );
}
