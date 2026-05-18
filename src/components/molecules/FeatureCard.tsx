'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  linkText: string;
}

// HomeClient'taki 3 özdeş kart tekrarını elimine eder
export function FeatureCard({ icon, title, description, href, linkText }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="premium-card p-8 space-y-4"
    >
      <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      <a href={href} className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
        {linkText} <Sparkles size={16} />
      </a>
    </motion.div>
  );
}
