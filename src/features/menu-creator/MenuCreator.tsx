'use client';

import { useState, useEffect } from 'react';
import {
  Plus, Trash2, Printer,
  Sparkles, X, ChevronRight, Image as ImageIcon,
  Settings, Save, ChevronDown, UtensilsCrossed, Upload,
  CheckCircle2, ArrowRight
} from 'lucide-react';
import { useMenuStore } from '@/store/useMenuStore';
import { translations } from '@/lib/i18n';
import { cn } from '@/lib/utils';

// Desteklenen para birimleri
const CURRENCIES = [
  { code: 'TRY', symbol: '₺', label: 'TL' },
  { code: 'USD', symbol: '$', label: 'USD' },
  { code: 'EUR', symbol: '€', label: 'EUR' },
  { code: 'GBP', symbol: '£', label: 'GBP' },
] as const;

type CurrencyCode = typeof CURRENCIES[number]['code'];

interface MenuItem {
  id: string;
  name: string;
  price: string;
  description?: string;
  image?: any;
  prepTime?: string;
  calories?: string;
  portion?: string;
  ingredients?: string;
  spicy?: number;
  stockStatus?: string;
  badge?: string;
  allergens?: string[];
}

interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

// Wizard adım göstergesi — kullanıcının menü oluşturma sürecini takip etmesini sağlar
function WizardStep({
  number, label, isComplete, isActive
}: {
  number: number; label: string; isComplete: boolean; isActive: boolean
}) {
  return (
    <div className={cn(
      "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300",
      isComplete ? "text-primary" : isActive ? "text-foreground" : "text-muted-foreground opacity-40"
    )}>
      <div className={cn(
        "w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-300 text-[10px]",
        isComplete
          ? "bg-primary border-primary text-white"
          : isActive
          ? "border-foreground text-foreground"
          : "border-border text-muted-foreground"
      )}>
        {isComplete ? <CheckCircle2 size={12} /> : number}
      </div>
      <span className="hidden sm:block">{label}</span>
    </div>
  );
}

export function MenuCreator() {
  const { language } = useMenuStore();
  const [mounted, setMounted] = useState(false);
  const [restaurantName, setRestaurantName] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [showNextSteps, setShowNextSteps] = useState(false);
  // Para birimi — tüm menü için global, her ürünü ayrı ayrı değil
  const [currency, setCurrency] = useState<CurrencyCode>('TRY');
  // Blur'da boş bırakılan item name'lerini takip eder (validasyon göstermek için)
  const [nameErrors, setNameErrors] = useState<Set<string>>(new Set());

  const t = (translations[language] || translations['tr']).creator;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const generateId = () => Math.random().toString(36).substring(2, 9) + Date.now().toString(36).slice(-4);

  const addCategory = () => {
    const newCat: Category = { id: generateId(), name: '', items: [] };
    setCategories([...categories, newCat]);
    setActiveCategoryId(newCat.id);
  };

  const deleteCategory = (catId: string) => {
    const updated = categories.filter(c => c.id !== catId);
    setCategories(updated);
    if (activeCategoryId === catId) {
      setActiveCategoryId(updated.length > 0 ? updated[updated.length - 1].id : null);
    }
  };

  const addItem = (catId: string) => {
    setCategories(categories.map(c =>
      c.id === catId
        ? { ...c, items: [...(c.items || []), { id: generateId(), name: '', price: '', stockStatus: 'available', badge: 'none', allergens: [], dietary: [] } as MenuItem] }
        : c
    ));
  };

  const updateItem = (catId: string, itemId: string, field: keyof MenuItem, value: any) => {
    setCategories(categories.map(c =>
      c.id === catId
        ? { ...c, items: (c.items || []).map(i => i.id === itemId ? { ...i, [field]: value } : i) }
        : c
    ));
  };

  const toggleExpand = (itemId: string) => {
    const newSet = new Set(expandedItems);
    if (newSet.has(itemId)) newSet.delete(itemId); else newSet.add(itemId);
    setExpandedItems(newSet);
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify({ restaurantName, currency, categories }, null, 2)], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeName = restaurantName.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'adsiz';
    a.download = `qr-menu-${safeName}-backup.txt`;
    a.click();
  };

  const importData = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.categories) {
          setCategories(data.categories);
          setRestaurantName(data.restaurantName || '');
          if (data.currency) setCurrency(data.currency);
          if (data.categories.length > 0) setActiveCategoryId(data.categories[0].id);
        }
      } catch (err) { alert('Hata: Dosya okunamadı!'); }
    };
    reader.readAsText(file);
  };

  // Fiyat alanı: sadece rakam ve tek ondalık nokta
  const sanitizePrice = (value: string) =>
    value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');

  // Sadece tam sayı kabul eden alanlar (hazırlanma süresi, kalori, porsiyon)
  const sanitizeInteger = (value: string) =>
    value.replace(/[^0-9]/g, '');

  // İsim alanı blur validasyonu
  const handleNameBlur = (itemId: string, value: string) => {
    if (!value.trim()) {
      setNameErrors(prev => new Set(prev).add(itemId));
    } else {
      setNameErrors(prev => { const s = new Set(prev); s.delete(itemId); return s; });
    }
  };

  const activeCategory = categories.find(c => c.id === activeCategoryId);
  const totalItems = categories.reduce((sum, c) => sum + (c.items?.length || 0), 0);

  // Wizard adım durumları
  const step1Done = restaurantName.trim().length > 0;
  const step2Done = categories.length > 0;
  const step3Done = totalItems > 0;

  const wizardLabels = language === 'tr'
    ? ['İşletme Adı', 'Kategori Ekle', 'Ürün Ekle & Paylaş']
    : ['Business Name', 'Add Category', 'Add Items & Share'];

  return (
    <div className="w-full min-h-screen bg-[#F5F5F7] dark:bg-black pt-20 pb-40">
      <div className="max-w-7xl mx-auto px-4 print:hidden">

        {/* Wizard Progress Bar */}
        <div className="mb-6 bg-white dark:bg-[#1C1C1E] rounded-3xl px-6 py-4 shadow-sm border border-border/50 flex items-center justify-between gap-4">
          <WizardStep number={1} label={wizardLabels[0]} isComplete={step1Done} isActive={!step1Done} />
          <div className={cn("flex-1 h-px transition-colors duration-500", step1Done ? "bg-primary/40" : "bg-border/50")} />
          <WizardStep number={2} label={wizardLabels[1]} isComplete={step2Done} isActive={step1Done && !step2Done} />
          <div className={cn("flex-1 h-px transition-colors duration-500", step2Done ? "bg-primary/40" : "bg-border/50")} />
          <WizardStep number={3} label={wizardLabels[2]} isComplete={step3Done} isActive={step2Done && !step3Done} />
        </div>

        {/* Main Layout */}
        <div className="flex flex-col md:flex-row gap-6">

          {/* Sidebar */}
          <div className="w-full md:w-80 space-y-4">
            <div className="bg-white dark:bg-[#1C1C1E] rounded-[2rem] p-6 shadow-sm border border-border/50 space-y-5">
              <div>
                <label className="text-[10px] font-black uppercase text-primary mb-2 block tracking-widest">{t.businessName}</label>
                <input
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  placeholder={language === 'tr' ? "Örn: Emre'nin Mutfağı" : "e.g. Emre's Kitchen"}
                  className="w-full bg-transparent border-b-2 border-primary/20 outline-none text-xl font-black"
                />
              </div>

              {/* Para birimi seçici — tüm menü için global */}
              <div>
                <label className="text-[10px] font-black uppercase text-primary/60 mb-2 block tracking-widest">
                  {language === 'tr' ? 'Para Birimi' : 'Currency'}
                </label>
                <div className="flex gap-1 bg-muted rounded-2xl p-1">
                  {CURRENCIES.map(c => (
                    <button
                      key={c.code}
                      onClick={() => setCurrency(c.code)}
                      className={cn(
                        "flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-wide transition-all",
                        currency === c.code
                          ? "bg-white dark:bg-zinc-700 text-primary shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {c.symbol} {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1C1C1E] rounded-[2rem] overflow-hidden shadow-sm border border-border/50 flex flex-col">
              <div className="p-5 border-b border-border bg-muted/20">
                <button
                  onClick={addCategory}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-black text-xs tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all uppercase"
                >
                  <Plus size={18} /> {t.newCategory}
                </button>
              </div>
              <div className="p-2 space-y-1 max-h-[400px] overflow-y-auto">
                <div className="px-3 py-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-50">{t.menuStructure}</div>
                {categories.map(cat => (
                  <div key={cat.id} className="group flex items-center gap-1">
                    <button
                      onClick={() => setActiveCategoryId(cat.id)}
                      className={cn(
                        "flex-1 text-left p-4 rounded-2xl text-sm font-bold transition-all flex items-center justify-between",
                        activeCategoryId === cat.id
                          ? "bg-primary/5 text-primary border border-primary/20"
                          : "hover:bg-muted"
                      )}
                    >
                      <span className="truncate">{cat.name || (language === 'tr' ? 'İsimsiz' : 'Unnamed')}</span>
                      <ChevronRight size={14} className={cn("transition-transform opacity-30 shrink-0", activeCategoryId === cat.id && "rotate-90 opacity-100")} />
                    </button>
                    {/* Kategori silme — her zaman görünür (hover'a bağlı değil) */}
                    <button
                      onClick={() => deleteCategory(cat.id)}
                      className="p-2 rounded-xl text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                      aria-label="Kategori sil"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                {categories.length === 0 && (
                  <div className="p-8 text-center opacity-20 text-[10px] font-black uppercase">{t.emptyHint}</div>
                )}
              </div>
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1">
            {activeCategory ? (
              <div className="space-y-6">
                <div className="bg-white dark:bg-[#1C1C1E] rounded-[2rem] p-6 shadow-sm border border-border/50 flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="flex-1 w-full">
                    <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest mb-1 block">{t.categoryName}</label>
                    <input
                      value={activeCategory.name}
                      onChange={(e) => setCategories(categories.map(c => c.id === activeCategory.id ? { ...c, name: e.target.value } : c))}
                      className="bg-transparent text-4xl font-black outline-none w-full border-b-2 border-transparent focus:border-primary/10 transition-all uppercase"
                      placeholder={t.categoryPlaceholder}
                    />
                  </div>
                  <button
                    onClick={() => addItem(activeCategory.id)}
                    className="w-full sm:w-auto bg-zinc-900 text-white dark:bg-primary dark:text-white px-10 py-5 rounded-[2rem] font-black flex items-center justify-center gap-2 shrink-0 shadow-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-xs"
                  >
                    <Plus size={20} /> {t.addItemToCategory}
                  </button>
                </div>

                {activeCategory.items?.length === 0 && (
                  <div className="bg-white dark:bg-[#1C1C1E] rounded-[2rem] p-10 shadow-sm border-2 border-dashed border-border/50 flex flex-col items-center gap-4 text-center">
                    <UtensilsCrossed size={40} className="opacity-10" />
                    <p className="text-sm font-bold text-muted-foreground">
                      {language === 'tr'
                        ? 'Bu kategoride henüz ürün yok. Yukarıdaki butona tıkla!'
                        : 'No items in this category yet. Click the button above!'}
                    </p>
                  </div>
                )}

                {activeCategory.items?.map(item => (
                  <div key={item.id} className="bg-white dark:bg-[#1C1C1E] rounded-[2rem] p-5 shadow-sm border border-border/50 group">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-32 h-32 bg-muted rounded-2xl overflow-hidden flex-shrink-0 relative border border-border/50">
                        {item.image ? (
                          <>
                            <img
                              src={item.image}
                              alt={item.name}
                              className={cn(
                                "w-full h-full object-cover transition-all duration-500",
                                item.stockStatus === 'out_of_stock' && "opacity-40 grayscale"
                              )}
                            />
                            <button
                              onClick={() => updateItem(activeCategory.id, item.id, 'image', null)}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                              aria-label="Görseli kaldır"
                            >
                              <X size={12} />
                            </button>
                          </>
                        ) : (
                          <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer gap-1 hover:bg-muted/80 transition-colors">
                            <ImageIcon size={24} className="opacity-20" />
                            <span className="text-[9px] font-black uppercase opacity-30">
                              {language === 'tr' ? 'Görsel Ekle' : 'Add Image'}
                            </span>
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => updateItem(activeCategory.id, item.id, 'image', reader.result);
                                reader.readAsDataURL(file);
                              }
                            }} />
                          </label>
                        )}
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="flex gap-4 items-end">
                          {/* İsim alanı — blur'da boş bırakılamaz */}
                          <div className="flex-1">
                            <input
                              value={item.name}
                              onChange={(e) => {
                                updateItem(activeCategory.id, item.id, 'name', e.target.value);
                                if (e.target.value.trim()) {
                                  setNameErrors(prev => { const s = new Set(prev); s.delete(item.id); return s; });
                                }
                              }}
                              onBlur={(e) => handleNameBlur(item.id, e.target.value)}
                              placeholder={t.namePlaceholder}
                              className={cn(
                                "w-full bg-transparent border-b-2 outline-none text-xl font-black transition-colors",
                                nameErrors.has(item.id)
                                  ? "border-red-400 placeholder:text-red-300"
                                  : "border-border focus:border-primary/40"
                              )}
                            />
                            {nameErrors.has(item.id) && (
                              <p className="text-[9px] font-black text-red-500 uppercase tracking-widest mt-1">
                                {language === 'tr' ? 'Ürün adı boş bırakılamaz' : 'Product name is required'}
                              </p>
                            )}
                          </div>

                          {/* Fiyat alanı — sadece rakam + nokta, currency sembolü prefix */}
                          <div className="flex items-center gap-1 border-b-2 border-border focus-within:border-primary/40 transition-colors pb-1 shrink-0">
                            <span className="text-xl font-black text-primary/50 select-none">
                              {CURRENCIES.find(c => c.code === currency)?.symbol}
                            </span>
                            <input
                              value={item.price}
                              onChange={(e) => updateItem(activeCategory.id, item.id, 'price', sanitizePrice(e.target.value))}
                              placeholder="0.00"
                              inputMode="decimal"
                              className="w-20 bg-transparent outline-none text-xl font-black text-primary text-right"
                            />
                          </div>
                        </div>
                        <textarea
                          value={item.description}
                          onChange={(e) => updateItem(activeCategory.id, item.id, 'description', e.target.value)}
                          placeholder={t.descPlaceholder}
                          className="w-full bg-transparent outline-none text-sm text-muted-foreground resize-none h-12"
                        />
                        <div className="flex items-center gap-4 pt-2 border-t border-border/50">
                          <button
                            onClick={() => toggleExpand(item.id)}
                            className={cn(
                              "flex items-center gap-2 text-[10px] font-black uppercase px-4 py-2 rounded-xl transition-all",
                              expandedItems.has(item.id) ? "bg-primary text-white" : "bg-muted hover:bg-muted/80"
                            )}
                          >
                            <Settings size={12} />
                            {t.detailedSettings}
                            <ChevronDown size={14} className={cn("transition-transform duration-300", expandedItems.has(item.id) && "rotate-180")} />
                          </button>
                          {item.stockStatus === 'out_of_stock' && (
                            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest italic">
                              {t.soldOut || (language === 'tr' ? 'TÜKENDİ' : 'SOLD OUT')}
                            </span>
                          )}
                          {item.badge && item.badge !== 'none' && (
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded-lg border border-primary/10">
                              {/* @ts-ignore */}
                              {t.badges?.[item.badge] || item.badge.replace('_', ' ').toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Silme butonu — mobilde her zaman görünür, masaüstünde hover'da */}
                      <button
                        onClick={() => setCategories(categories.map(c => c.id === activeCategory.id ? { ...c, items: c.items.filter(i => i.id !== item.id) } : c))}
                        className="p-2 text-muted-foreground hover:text-red-500 self-start transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                        aria-label="Ürünü sil"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {expandedItems.has(item.id) && (
                      <div className="pt-6 mt-6 border-t border-border/50 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-2">
                            {/* Sadece tam sayı kabul eder — dakika, kcal, gram */}
                            {[
                              { f: 'prepTime', l: t.prepTime, unit: language === 'tr' ? 'dk' : 'min' },
                              { f: 'calories', l: t.calories, unit: 'kcal' },
                              { f: 'portion', l: t.portion, unit: 'gr' }
                            ].map(x => (
                              <div key={x.f}>
                                <label className="text-[9px] font-black mb-1 block opacity-50 uppercase tracking-tighter">{x.l}</label>
                                <div className="flex items-center bg-muted rounded-lg px-2 py-2 gap-1">
                                  <input
                                    value={(item as any)[x.f] || ''}
                                    onChange={(e) => updateItem(activeCategory.id, item.id, x.f as any, sanitizeInteger(e.target.value))}
                                    inputMode="numeric"
                                    placeholder="—"
                                    className="w-full bg-transparent text-xs font-bold outline-none min-w-0"
                                  />
                                  <span className="text-[9px] font-black opacity-30 uppercase shrink-0">{x.unit}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div>
                            <label className="text-[9px] font-black mb-1 block opacity-50 uppercase">{t.ingredients}</label>
                            <textarea value={item.ingredients || ''} onChange={(e) => updateItem(activeCategory.id, item.id, 'ingredients', e.target.value)} className="w-full bg-muted rounded-xl px-3 py-2 text-xs font-bold outline-none h-16 resize-none" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-[9px] font-black mb-1 block opacity-50 uppercase tracking-widest">{t.stock}</label>
                              <select value={item.stockStatus} onChange={(e) => updateItem(activeCategory.id, item.id, 'stockStatus', e.target.value)} className="w-full bg-muted rounded-lg px-2 py-2 text-xs font-bold outline-none uppercase">
                                <option value="available">{language === 'tr' ? 'Mevcut' : 'Available'}</option>
                                <option value="out_of_stock">{language === 'tr' ? 'Tükendi' : 'Out of Stock'}</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[9px] font-black mb-1 block opacity-50 uppercase tracking-widest">{t.badgeLabel}</label>
                              <select value={item.badge} onChange={(e) => updateItem(activeCategory.id, item.id, 'badge', e.target.value)} className="w-full bg-muted rounded-lg px-2 py-2 text-xs font-bold outline-none uppercase">
                                {Object.entries(t.badges || {}).map(([key, label]) => (
                                  <option key={key} value={key}>{label as string}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="text-[9px] font-black mb-1 block opacity-50 uppercase tracking-widest">{t.spicy}</label>
                            <div className="flex gap-2">
                              {[0, 1, 2, 3].map(s => (
                                <button key={s} onClick={() => updateItem(activeCategory.id, item.id, 'spicy', s)} className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-sm transition-all", item.spicy === s ? "bg-primary text-white" : "bg-muted")}>{s === 0 ? <X size={14} /> : '🌶️'.repeat(s)}</button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* Boş durum — adım adım yönlendirme */
              <div className="h-[500px] flex flex-col items-center justify-center bg-white dark:bg-[#1C1C1E] rounded-[3rem] border-2 border-dashed border-border/50 p-10 text-center gap-6">
                <UtensilsCrossed size={56} className="opacity-10" />
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-2">
                    {language === 'tr' ? 'Menünü Oluşturmaya Başla' : 'Start Building Your Menu'}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium max-w-xs mx-auto">
                    {language === 'tr'
                      ? 'Sol panelden işletme adını gir, sonra kategori ekle ve ürünlerini gir.'
                      : 'Enter your business name on the left, then add categories and items.'}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  <div className={cn("flex items-center gap-2 px-4 py-2 rounded-xl border", step1Done ? "border-primary/30 text-primary bg-primary/5" : "border-border/50")}>
                    {step1Done ? <CheckCircle2 size={12} className="text-primary" /> : <span className="opacity-40">1</span>}
                    {language === 'tr' ? 'İşletme Adı' : 'Business Name'}
                  </div>
                  <div className={cn("flex items-center gap-2 px-4 py-2 rounded-xl border", step2Done ? "border-primary/30 text-primary bg-primary/5" : "border-border/50")}>
                    {step2Done ? <CheckCircle2 size={12} className="text-primary" /> : <span className="opacity-40">2</span>}
                    {language === 'tr' ? 'Kategori Ekle' : 'Add Category'}
                  </div>
                  <div className={cn("flex items-center gap-2 px-4 py-2 rounded-xl border", step3Done ? "border-primary/30 text-primary bg-primary/5" : "border-border/50")}>
                    {step3Done ? <CheckCircle2 size={12} className="text-primary" /> : <span className="opacity-40">3</span>}
                    {language === 'tr' ? 'Ürün Ekle' : 'Add Items'}
                  </div>
                </div>
                <button
                  onClick={addCategory}
                  className="bg-primary text-white px-12 py-4 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all"
                >
                  {t.newCategory}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 z-50 print:hidden">
        <div className="bg-zinc-900 text-white p-3 rounded-[3rem] shadow-2xl flex items-center justify-between border border-white/10">
          <div className="flex items-center gap-2 ml-4">
            <Sparkles size={18} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">{t.studioTitle}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={exportData}
              disabled={!step1Done && categories.length === 0}
              className={cn(
                "flex items-center gap-2 px-3 py-3 rounded-full text-[10px] font-black transition-all uppercase tracking-widest",
                (!step1Done && categories.length === 0)
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-white/10"
              )}
            >
              <Save size={16} />
              <span className="hidden sm:block">{t.export}</span>
            </button>
            <label className="flex items-center gap-2 px-3 py-3 hover:bg-white/10 rounded-full text-[10px] font-black cursor-pointer transition-all uppercase tracking-widest">
              <Upload size={16} />
              <span className="hidden sm:block">{t.import}</span>
              <input type="file" className="hidden" accept=".txt" onChange={(e) => e.target.files?.[0] && importData(e.target.files[0])} />
            </label>
            <button
              onClick={() => window.print()}
              disabled={!step3Done}
              className={cn(
                "flex items-center gap-2 px-4 sm:px-6 py-3 rounded-full text-[10px] font-black transition-all uppercase tracking-widest",
                !step3Done
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-white/10"
              )}
            >
              <Printer size={16} />
              <span className="hidden sm:block">{t.downloadPdf}</span>
            </button>
            {/* Sonraki adımlar — menü hazır olunca QR oluşturma sürecine geçiş */}
            <button
              onClick={() => setShowNextSteps(true)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-[2rem] font-black text-[10px] shadow-lg transition-all uppercase tracking-widest",
                step3Done
                  ? "bg-primary text-white shadow-primary/30 hover:scale-105 animate-pulse"
                  : "bg-white/10 text-white/50 cursor-not-allowed"
              )}
              disabled={!step3Done}
            >
              {language === 'tr' ? 'Yayınla' : 'Publish'}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Global Print Reset */}
      <style dangerouslySetInnerHTML={{ __html: `
        @page { margin: 0 !important; }
        @media print {
          body {
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          header, footer, nav, .no-print {
            display: none !important;
            height: 0 !important;
            overflow: hidden !important;
          }
        }
      ` }} />

      {/* Print View */}
      <div className="hidden print:block absolute inset-0 bg-white p-[20mm] text-black min-h-screen">
        <div className="text-center mb-16 border-b-8 border-black pb-10">
          <h1 className="text-7xl font-black uppercase italic tracking-tighter leading-none">{restaurantName || 'MENÜ'}</h1>
        </div>
        <div className="space-y-24">
          {categories.map(cat => (
            <div key={cat.id} className="break-inside-avoid mb-16">
              <h2 className="text-4xl font-black uppercase border-b-4 border-black mb-10 pb-2">{cat.name}</h2>
              <div className="space-y-12">
                {cat.items?.map(item => (
                  <div key={item.id} className={cn("flex gap-10 items-start border-b-2 border-dotted border-black/10 pb-8", item.stockStatus === 'out_of_stock' && "opacity-40")}>
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className={cn("w-32 h-32 rounded-[2.5rem] object-cover shadow-lg", item.stockStatus === 'out_of_stock' && "grayscale")}
                      />
                    )}
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-baseline">
                        <div className="flex items-center gap-3">
                          <h3 className="text-2xl font-black uppercase tracking-tight">{item.name}</h3>
                          {item.badge && item.badge !== 'none' && (
                            <span className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full">
                              {/* @ts-ignore */}
                              {t.badges?.[item.badge] || item.badge.replace('_', ' ').toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 border-b-2 border-dotted border-black/20 mx-6 mb-2" />
                        <span className="text-3xl font-black">
                          {CURRENCIES.find(c => c.code === currency)?.symbol}{item.price}
                        </span>
                      </div>
                      {item.description && <p className="text-lg opacity-70 italic font-medium leading-relaxed">{item.description}</p>}
                      {item.stockStatus === 'out_of_stock' && (
                        <p className="text-red-600 font-black text-xs uppercase italic tracking-widest">
                          {language === 'tr' ? 'ŞU AN MEVCUT DEĞİL' : 'CURRENTLY UNAVAILABLE'}
                        </p>
                      )}
                      <div className="flex gap-6 mt-4 text-xs font-black uppercase tracking-widest opacity-40 italic">
                        {item.prepTime && <span>⏱️ {item.prepTime} DK</span>}
                        {item.calories && <span>🔥 {item.calories} KCAL</span>}
                        {item.portion && <span>⚖️ {item.portion} GR</span>}
                        {item.spicy && item.spicy > 0 && <span>{'🌶️'.repeat(Math.max(0, Number(item.spicy) || 0))}</span>}
                      </div>
                      {item.ingredients && <p className="text-sm opacity-50 mt-2 font-medium"><strong>{language === 'tr' ? 'İçindekiler' : 'Ingredients'}:</strong> {item.ingredients}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps Modal */}
      {showNextSteps && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1C1C1E] w-full max-w-3xl rounded-[3rem] p-8 md:p-12 shadow-2xl relative border border-border/50 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowNextSteps(false)}
              className="absolute top-8 right-8 p-2 hover:bg-muted rounded-full transition-colors"
              aria-label="Kapat"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles size={32} />
              </div>
              <h3 className="text-3xl font-black tracking-tighter uppercase italic leading-none mb-2">{t.nextSteps.ready}</h3>
              <p className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">{t.nextSteps.followSteps}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b-2 border-primary pb-2">
                  <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black italic">1</div>
                  <h4 className="font-black text-sm uppercase tracking-widest leading-none">{t.nextSteps.initialSetup}</h4>
                </div>
                <div className="space-y-3">
                  {t.nextSteps.setupSteps?.map((step: any, i: number) => (
                    <div key={i} className="bg-muted/30 p-4 rounded-2xl border border-border/20">
                      <p className="text-[11px] font-black uppercase text-primary mb-1">{step.t}</p>
                      <p className="text-[10px] font-medium opacity-60 leading-tight">{step.d}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b-2 border-green-500 pb-2">
                  <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black italic">2</div>
                  <h4 className="font-black text-sm uppercase tracking-widest leading-none text-green-600">{t.nextSteps.updateTitle}</h4>
                </div>
                <div className="bg-green-500/5 p-6 rounded-[2.5rem] border-2 border-dashed border-green-500/20 text-center flex-1 h-full flex flex-col justify-center">
                  <p className="text-sm font-black text-green-700 uppercase italic mb-3">{t.nextSteps.smartMethod}</p>
                  <p className="text-[11px] font-medium leading-relaxed text-green-600/80">
                    {t.nextSteps.smartDesc}
                    <br/><br/>
                    <b>{language === 'tr' ? 'Sonuç:' : 'Result:'}</b> {t.nextSteps.smartResult}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <a
                href="/generate"
                className="flex-1 bg-primary text-white py-5 rounded-[2rem] font-black text-center shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-[10px]"
              >
                {t.nextSteps.generateQr}
              </a>
              <button
                onClick={() => setShowNextSteps(false)}
                className="flex-1 bg-muted text-foreground py-5 rounded-[2rem] font-black hover:bg-muted/80 transition-all uppercase tracking-widest text-[10px]"
              >
                {t.nextSteps.gotIt}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
