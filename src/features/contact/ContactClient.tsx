'use client';

import { PageLayout } from '@/components/organisms/PageLayout';
import { useMenuStore } from '@/store/useMenuStore';
import { translations } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { GithubIcon } from '@/components/atoms/Icon';

export function ContactClient() {
  const { language } = useMenuStore();
  const t = translations[language].contact;

  return (
    <PageLayout>
      <section className="flex-1 max-w-2xl mx-auto px-4 py-20 w-full flex flex-col items-center justify-center">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.title}</h1>
          <p className="text-xl text-muted-foreground">{t.subtitle}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="premium-card p-10 space-y-8 h-fit w-full max-w-md"
        >
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-2xl text-primary">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t.email}</p>
              <a href="mailto:karabayemre10@gmail.com" className="font-bold hover:text-primary transition-colors">
                karabayemre10@gmail.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-2xl text-primary">
              <GithubIcon size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t.github}</p>
              <a
                href="https://github.com/emrekarabay"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:text-primary transition-colors"
              >
                github.com/emrekarabay
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </PageLayout>
  );
}
