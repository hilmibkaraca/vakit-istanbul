# Vakit İstanbul - Namaz Vakitleri

İstanbul için güncel namaz vakitleri, ezan saatleri ve kıble yönü bilgilerini sunan modern PWA uygulaması.

## 🚀 Özellikler

- ✅ **Güncel Namaz Vakitleri**: Diyanet İşleri Başkanlığı'nın resmi verilerini kullanır
- ✅ **39 İlçe Desteği**: İstanbul'un tüm ilçeleri için ayrı vakitler
- ✅ **PWA Desteği**: Mobil cihaza yüklenebilir, çevrimdışı çalışır
- ✅ **Karanlık/Aydınlık Tema**: Kullanıcı tercihine göre tema değişimi
- ✅ **Gerçek Zamanlı Sayaç**: Sonraki vakte kalan süre
- ✅ **Bildirim Desteği**: Namaz vakitlerine yakın bildirimler
- ✅ **Responsive Tasarım**: Tüm cihazlarda uyumlu çalışır
- ✅ **SEO Optimizasyonu**: Arama motorları için optimize edilmiş
- ✅ **AdSense Entegrasyonu**: Gelir modeli için reklam desteği

## 🛠 Teknolojiler

- **Next.js 14**: React framework (App Router)
- **TypeScript**: Tip güvenliği
- **Tailwind CSS**: Modern stil framework'ü
- **PWA**: Progressive Web App özellikleri
- **Google Analytics**: Kullanım analizi
- **Google AdSense**: Reklam sistemi
- **Vercel**: Hosting ve deployment

## 📱 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Lokal Geliştirme

```bash
# Projeyi klonla
git clone https://github.com/username/vakit-istanbul.git
cd vakit-istanbul

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

### Ortam Değişkenleri

`.env.local` dosyası oluşturun:

```env
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-your-client-id
NEXT_PUBLIC_GA_ID=G-your-ga-id
```

## 🚀 Deployment

### Vercel (Önerilen)

```bash
# Vercel CLI ile deploy
npm run deploy

# Veya Vercel dashboard'dan GitHub bağlantısı ile otomatik deploy
```

### Diğer Platformlar

```bash
# Build alma
npm run build

# Production sunucusu
npm run start
```

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── prayer-times/  # Namaz vakitleri API
│   ├── layout.tsx         # Ana layout
│   ├── page.tsx          # Ana sayfa
│   ├── globals.css       # Global stiller
│   ├── sitemap.ts        # SEO sitemap
│   ├── privacy/          # Gizlilik sayfası
│   └── contact/          # İletişim sayfası
├── components/            # React bileşenleri
│   ├── PrayerCard.tsx    # Namaz vakti kartı
│   ├── TimeCountdown.tsx # Geri sayım
│   ├── DistrictSelector.tsx # İlçe seçici
│   ├── ThemeToggle.tsx   # Tema değiştirici
│   └── AdBanner.tsx      # Reklam bileşeni
├── hooks/                # Custom React hooks
│   ├── usePrayerTimes.ts # Namaz vakitleri hook
│   └── useTheme.ts       # Tema hook
├── lib/                  # Yardımcı fonksiyonlar
│   ├── constants.ts      # Sabitler
│   ├── prayer-times.ts   # Vakit hesaplama
│   └── analytics.ts      # Google Analytics
└── types/                # TypeScript tipler
    └── index.ts
```

## 🔧 Özelleştirme

### Yeni İlçe Ekleme

`src/lib/constants.ts` dosyasındaki `ISTANBUL_DISTRICTS` dizisine yeni ilçe ekleyin:

```typescript
{ id: '40', name: 'Yeni İlçe', code: 'YENI_ILCE' }
```

### Tema Renkleri

`tailwind.config.ts` dosyasından ana renkleri değiştirebilirsiniz:

```typescript
theme: {
  extend: {
    colors: {
      primary: '#10b981', // Ana renk
      // ...
    }
  }
}
```

### API Endpoint Değiştirme

`src/lib/constants.ts` dosyasından API endpoint'lerini güncelleyebilirsiniz.

## 📊 Analytics ve Monitoring

### Google Analytics Olayları

- `view_prayer_times`: Namaz vakitleri görüntüleme
- `change_district`: İlçe değiştirme
- `toggle_theme`: Tema değiştirme
- `pwa_install`: PWA yükleme
- `notification_permission`: Bildirim izni

### Performance Monitoring

- Core Web Vitals otomatik takip edilir
- API yanıt süreleri izlenir
- Hata raporları Analytics'e gönderilir

## 🔒 Güvenlik

- HTTPS zorunlu
- XSS koruması
- CSRF koruması
- Content Security Policy
- Güvenli header'lar

## 📄 Lisans

MIT License. Detaylar için `LICENSE` dosyasına bakın.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📞 İletişim

- **E-posta**: info@vakit.istanbul
- **Web**: [vakit.istanbul](https://vakit.istanbul)
- **GitHub**: [github.com/username/vakit-istanbul](https://github.com/username/vakit-istanbul)

## 🙏 Teşekkürler

- [Diyanet İşleri Başkanlığı](https://diyanet.gov.tr) - Namaz vakitleri verileri
- [Ezanvakti.herokuapp.com](https://ezanvakti.herokuapp.com) - API sağlayıcısı
- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [Vercel](https://vercel.com) - Hosting platform

---

**Not**: Bu uygulama açık kaynak kodludur ve herhangi bir resmi kurum ile bağlantılı değildir. Namaz vakitleri bilgileri resmi kaynaklardan alınmakta olup, kesin bilgi için yerel müftülüğe danışmanız önerilir.