import { Metadata } from 'next';
import { ContactClient } from '@/features/contact/ContactClient';
import tr from '@/data/locales-tr.json';

/**
 * ÖĞRENME NOTU: Metadata API ve SEO
 * App Router'da her sayfanın kendine özel metadata'sı olabilir. 
 * Bu yapı, arama motorlarının sayfayı daha iyi anlamasını sağlar.
 */

export const metadata: Metadata = {
  title: tr.seo.contact.title,
  description: tr.seo.contact.description,
};

export default function Contact() {
  return <ContactClient />;
}
