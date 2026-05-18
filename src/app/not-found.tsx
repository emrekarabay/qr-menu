import Link from 'next/link';
import { QrCode } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-black flex flex-col items-center justify-center px-4 text-center">
      <div className="space-y-8 max-w-md">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="bg-primary p-2 rounded-xl">
            <QrCode className="text-white" size={28} />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            QR<span className="text-primary">Menu</span>
          </span>
        </Link>

        {/* Hata kodu */}
        <div className="space-y-3">
          <p className="text-[120px] font-black tracking-tighter leading-none text-primary/10 select-none">
            404
          </p>
          <h1 className="text-3xl font-black tracking-tighter -mt-6">
            Sayfa Bulunamadı
          </h1>
          <p className="text-muted-foreground font-medium leading-relaxed">
            Aradığınız sayfa mevcut değil ya da taşınmış olabilir.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-primary text-white px-8 py-4 rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/create"
            className="bg-white dark:bg-[#1C1C1E] border border-border px-8 py-4 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-muted transition-all"
          >
            Menü Oluştur
          </Link>
        </div>
      </div>
    </div>
  );
}
