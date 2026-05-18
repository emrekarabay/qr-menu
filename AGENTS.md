1. Görsel Standartlar (Apple/SaaS Estetiği)
Köşe Yumuşatma: Tüm kartlar ve butonlar rounded-3xl (24px) olacak.

Renk Paleti: Arka plan Light Mode'da #F5F5F7, Dark Mode'da #000000 (Pure Black) olacak. Kartlar Dark Mode'da #1C1C1E olacak.

Minimalizm: Gereksiz border'lar yerine çok hafif gölgeler (shadow-sm) veya çok ince opak çizgiler kullan.

Boşluklar: Öğeler arasında nefes alacak kadar geniş boşluklar (padding/gap) bırak.

2. Teknik Mimari (Tech Stack)
Bağımlılık Yasağı: QR oluşturma ve okuma için harici kütüphane ekleme. QR oluşturmayı qrserver API üzerinden, okumayı yerleşik BarcodeDetector API üzerinden yap.

Modern State: State yönetimi için React useState yerine global ölçekli durumlar için Zustand kullan.

Veri Gizliliği: "Sıfır Veri" ilkesine sadık kal. Hiçbir veritabanı veya localStorage kurulumu önerme. Bilgiyi URL veya geçici state üzerinden yönet.

3. SEO ve Dil Yönetimi (i18n)
SEO Önceliği: Tüm sayfalar Next.js Metadata API ile optimize edilmeli.

Çok Dillilik: Metinleri kodun içine gömme; TR ve EN olarak bir locales objesinde tut. Kullanıcı dil değiştirdiğinde tüm arayüz anında güncellenmeli.

Erişilebilirlik: Görsellere alt etiketleri ekle ve semantik HTML (main, section, nav, h1) kullan.

4. Kod Kalitesi ve Öğreticilik
Clean Code: Karmaşık mantıklar yerine küçük, okunabilir fonksiyonlar yaz.

Yorum Satırı: Her büyük tool (Zustand, Zod, Framer Motion) kullanımında, o toolun neden orada olduğunu ve ne işe yaradığını açıklayan tek satırlık yorumlar bırak.

Hata Yönetimi: URL doğrulaması için Zod şemalarını kullan ve geçersiz linklerde kullanıcıyı sessizce değil, şık bir toast/uyarı mesajı ile bilgilendir.

5. Bana Emre olarak hitap et