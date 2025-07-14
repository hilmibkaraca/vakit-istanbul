/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { ResponsiveAd, SquareAd } from '@/components/AdSense';

export const metadata: Metadata = {
  title: 'Modern Astronomik Cihazlar ile Namaz Vakitleri Belirleme | Vakit',
  description: 'Modern astronomik gözlem cihazları (DSLR kamera, CCD dedektör, ASC sistemleri) ile İslami ibadet vakitlerinin hassas belirlenmesi ve bilimsel gözlemler.',
  keywords: 'astronomik gözlem, CCD dedektör, DSLR kamera, ASC sistem, fotometrik gözlem, fecr-i sadık, güneş ufuk açısı, DİBRed yazılım, Diyanet gözlem',
  authors: [{ name: 'Vakit' }],
  openGraph: {
    title: 'Modern Astronomik Cihazlar ile Namaz Vakitleri | Vakit',
    description: 'Modern teknoloji ile İslami ibadet vakitlerinin hassas belirlenmesi ve bilimsel gözlem yöntemleri',
    url: 'https://vakit.istanbul/modern-cihazlar-ile-namaz-vakitleri',
    siteName: 'Vakit',
    locale: 'tr_TR',
    type: 'article',
  }
};

export default function ModernCihazlarPage() {
  return (
    <div className="min-h-screen islamic-pattern">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-islamic-950/90 backdrop-blur-md border-b border-islamic-200 dark:border-islamic-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-islamic-gradient rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-islamic-600 islamic-star"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-islamic-800 dark:text-islamic-100 group-hover:text-islamic-600 dark:group-hover:text-islamic-300 transition-colors">
                    Vakit
                  </h1>
                  <p className="text-sm text-islamic-600 dark:text-islamic-300">
                    Modern Astronomik Cihazlar
                  </p>
                </div>
              </Link>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article Content */}
          <article className="prose prose-islamic dark:prose-invert max-w-none lg:col-span-3">
          {/* Hero Section */}
          <div className="bg-white/80 dark:bg-islamic-900/60 backdrop-blur-sm rounded-2xl2 p-8 mb-8 border border-islamic-200 dark:border-islamic-700">
            <h1 className="text-3xl md:text-4xl font-bold text-islamic-800 dark:text-islamic-100 mb-4">
              Modern Astronomik Cihazlar ile Namaz Vakitleri Belirleme
            </h1>
            <p className="text-lg text-islamic-600 dark:text-islamic-300 leading-relaxed">
              21. yüzyılda astronomik gözlem teknolojileri, İslami ibadet vakitlerinin hassas bir şekilde 
              belirlenmesinde devrim yaratmıştır. CCD dedektörleri, DSLR kameralar ve ASC sistemleri 
              sayesinde güneşin ufuk altındaki konumu milimetre hassasiyetle ölçülebilmektedir.
            </p>
          </div>

          {/* İçindekiler */}
          <div className="bg-sage-50 dark:bg-sage-900/20 p-6 rounded-xl2 mb-8 border border-sage-200 dark:border-sage-700">
            <h2 className="text-xl font-semibold text-islamic-800 dark:text-islamic-100 mb-4">İçindekiler</h2>
            <nav className="space-y-2">
              <a href="#modern-cihazlar" className="block text-islamic-600 dark:text-islamic-300 hover:text-islamic-800 dark:hover:text-islamic-100 transition-colors">
                → Modern Gözlem Cihazları
              </a>
              <a href="#fotometrik-gozlem" className="block text-islamic-600 dark:text-islamic-300 hover:text-islamic-800 dark:hover:text-islamic-100 transition-colors">
                → Fotometrik Gözlem Teknikleri
              </a>
              <a href="#dibred-yazilim" className="block text-islamic-600 dark:text-islamic-300 hover:text-islamic-800 dark:hover:text-islamic-100 transition-colors">
                → DİBRed Analiz Yazılımı
              </a>
              <a href="#bilimsel-sonuclar" className="block text-islamic-600 dark:text-islamic-300 hover:text-islamic-800 dark:hover:text-islamic-100 transition-colors">
                → Bilimsel Sonuçlar ve Hassasiyet
              </a>
              <a href="#ustunlukler" className="block text-islamic-600 dark:text-islamic-300 hover:text-islamic-800 dark:hover:text-islamic-100 transition-colors">
                → Geleneksel Yöntemlere Üstünlükleri
              </a>
            </nav>
          </div>

          {/* Content Sections */}
          <section className="space-y-8">
            {/* Mid-Article Ad */}
            <div className="my-8 flex justify-center">
              <ResponsiveAd adSlot="2222333344" className="border border-islamic-200 dark:border-islamic-700 rounded-xl2 overflow-hidden bg-white/60 dark:bg-islamic-900/40 backdrop-blur-sm" />
            </div>
            {/* Giriş */}
            <div className="bg-white/60 dark:bg-islamic-900/40 p-6 rounded-xl2 backdrop-blur-sm border border-islamic-200 dark:border-islamic-700">
              <p className="text-islamic-700 dark:text-islamic-200 leading-relaxed">
                İslam dininde ibadet vakitleri, Güneş'in ufuk altındaki konumuna bağlı olarak Yer atmosferinde 
                oluşturduğu parlaklığa göre belirlenir. Günümüzde bu hassas ölçümler, gelişmiş astronomik 
                cihazlar sayesinde bilimsel kesinlikle yapılabilmektedir.
              </p>
            </div>

            {/* Modern Cihazlar */}
            <div id="modern-cihazlar" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-islamic-800 dark:text-islamic-100 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-gold-600 dark:text-gold-400">🔬</span>
                </span>
                Modern Gözlem Cihazları
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/60 dark:bg-islamic-900/40 p-6 rounded-xl2 backdrop-blur-sm border border-islamic-200 dark:border-islamic-700">
                  <h3 className="text-lg font-semibold text-gold-700 dark:text-gold-400 mb-3 flex items-center">
                    <span className="mr-2">📷</span>
                    DSLR Kamera Sistemleri
                  </h3>
                  <p className="text-islamic-600 dark:text-islamic-300 mb-3">
                    Digital Single Lens Reflex kameralar, insan gözünün görüş açısına en yakın optik ayarlarla 
                    çalışır ve CMOS dedektörleri sayesinde farklı renk bantlarında (R, G, B) hassas ölçümler yapar.
                  </p>
                  <div className="bg-gold-50 dark:bg-gold-900/20 p-3 rounded-lg text-sm">
                    <strong>Avantajları:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>• İnsan gözünden yüksek ışık duyarlılığı</li>
                      <li>• RGB spektral analiz kapasitesi</li>
                      <li>• Yüksek çözünürlüklü görüntü kalitesi</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white/60 dark:bg-islamic-900/40 p-6 rounded-xl2 backdrop-blur-sm border border-islamic-200 dark:border-islamic-700">
                  <h3 className="text-lg font-semibold text-gold-700 dark:text-gold-400 mb-3 flex items-center">
                    <span className="mr-2">🌐</span>
                    ASC (All Sky Camera) Sistemleri
                  </h3>
                  <p className="text-islamic-600 dark:text-islamic-300 mb-3">
                    Tüm Gökyüzü Kamerası, balık gözü formatında 360° görüş alanı sunarak ufkun tamamını 
                    eş zamanlı olarak gözlemleme imkanı sağlar.
                  </p>
                  <div className="bg-sage-50 dark:bg-sage-900/20 p-3 rounded-lg text-sm">
                    <strong>Avantajları:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>• Tam ufuk kapsamında gözlem</li>
                      <li>• DSLR'den daha yüksek hassasiyet</li>
                      <li>• Eş zamanlı çoklu nokta analizi</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white/60 dark:bg-islamic-900/40 p-6 rounded-xl2 backdrop-blur-sm border border-islamic-200 dark:border-islamic-700">
                  <h3 className="text-lg font-semibold text-gold-700 dark:text-gold-400 mb-3 flex items-center">
                    <span className="mr-2">🎯</span>
                    CCD Dedektörleri
                  </h3>
                  <p className="text-islamic-600 dark:text-islamic-300 mb-3">
                    Charge-Coupled Device dedektörleri, ışığa son derece duyarlı olan ve atmosferin 
                    aydınlanma/sönümlenme miktarını hassas şekilde ölçen sensörlerdir.
                  </p>
                  <div className="bg-islamic-50 dark:bg-islamic-900/20 p-3 rounded-lg text-sm">
                    <strong>Özellikler:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>• Düşük ışık seviyelerinde çalışma</li>
                      <li>• Yüksek kuantum verimliliği</li>
                      <li>• Düşük gürültü oranı</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white/60 dark:bg-islamic-900/40 p-6 rounded-xl2 backdrop-blur-sm border border-islamic-200 dark:border-islamic-700">
                  <h3 className="text-lg font-semibold text-gold-700 dark:text-gold-400 mb-3 flex items-center">
                    <span className="mr-2">🌡️</span>
                    Destekleyici Sistemler
                  </h3>
                  <p className="text-islamic-600 dark:text-islamic-300 mb-3">
                    Gözlemlerin doğruluğunu artırmak için meteoroloji istasyonları ve GPS cihazları 
                    da sisteme entegre edilmiştir.
                  </p>
                  <div className="bg-gold-50 dark:bg-gold-900/20 p-3 rounded-lg text-sm">
                    <strong>Kayıt Edilen Veriler:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>• Atmosferik nem, sıcaklık, basınç</li>
                      <li>• Rüzgar yönü ve hızı</li>
                      <li>• GPS konum ve zaman verileri</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Fotometrik Gözlem */}
            <div id="fotometrik-gozlem" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-islamic-800 dark:text-islamic-100 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-gold-600 dark:text-gold-400">📊</span>
                </span>
                Fotometrik Gözlem Teknikleri
              </h2>

              <div className="space-y-6">
                <div className="bg-white/60 dark:bg-islamic-900/40 p-6 rounded-xl2 backdrop-blur-sm border border-islamic-200 dark:border-islamic-700">
                  <h3 className="text-lg font-semibold text-islamic-700 dark:text-islamic-200 mb-3">
                    Fotometrik Ölçüm Nedir?
                  </h3>
                  <p className="text-islamic-600 dark:text-islamic-300 leading-relaxed mb-4">
                    Fotometrik gözlem, atmosferin aydınlanma ve sönümlenme miktarını ölçen bilimsel 
                    bir tekniktir. Bu yöntem ile güneşin ufuk altındaki konumuna göre gökyüzündeki 
                    ışık değişimleri hassas şekilde takip edilir.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-sage-50 dark:bg-sage-900/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-sage-700 dark:text-sage-300 mb-2">İmsak Ölçümü</h4>
                      <p className="text-sm text-islamic-600 dark:text-islamic-300">
                        Sabah vaktinde atmosferin ilk aydınlanma anının tespiti
                      </p>
                    </div>
                    <div className="bg-gold-50 dark:bg-gold-900/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-gold-700 dark:text-gold-300 mb-2">Şafak Analizi</h4>
                      <p className="text-sm text-islamic-600 dark:text-islamic-300">
                        Akşam vaktinde kızıllık ve beyazlığın kaybolma sürecinin izlenmesi
                      </p>
                    </div>
                    <div className="bg-islamic-50 dark:bg-islamic-900/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-islamic-700 dark:text-islamic-200 mb-2">Ufuk Analizi</h4>
                      <p className="text-sm text-islamic-600 dark:text-islamic-300">
                        Güneşin ufuk altındaki açısal konumunun belirlenmesi
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gold-50 to-islamic-50 dark:from-gold-900/10 dark:to-islamic-900/10 p-6 rounded-xl2 border border-gold-200 dark:border-gold-800">
                  <h3 className="text-lg font-semibold text-islamic-700 dark:text-islamic-200 mb-3">
                    Gözlem Avantajları
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gold-700 dark:text-gold-400 mb-2">✅ Modern Cihazlarla</h4>
                      <ul className="space-y-1 text-sm text-islamic-600 dark:text-islamic-300">
                        <li>• Işık kirliliğinden az etkilenme</li>
                        <li>• Sayısal veri analizi imkanı</li>
                        <li>• Tekrarlanabilir ölçümler</li>
                        <li>• Objektif sonuçlar</li>
                        <li>• Meteorolojik koşul entegrasyonu</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-sage-700 dark:text-sage-400 mb-2">❌ Geleneksel Yöntemlerle</h4>
                      <ul className="space-y-1 text-sm text-islamic-600 dark:text-islamic-300">
                        <li>• Subjektif değerlendirme</li>
                        <li>• Işık kirliliğinden yoğun etkilenme</li>
                        <li>• Atmosferik koşullara bağımlılık</li>
                        <li>• İnsan gözünün sınırlı duyarlılığı</li>
                        <li>• Tekrarlanabilirlik sorunu</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DİBRed Yazılım */}
            <div id="dibred-yazilim" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-islamic-800 dark:text-islamic-100 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-gold-600 dark:text-gold-400">💻</span>
                </span>
                DİBRed Analiz Yazılımı
              </h2>

              <div className="bg-white/60 dark:bg-islamic-900/40 p-6 rounded-xl2 backdrop-blur-sm border border-islamic-200 dark:border-islamic-700">
                <p className="text-islamic-600 dark:text-islamic-300 leading-relaxed mb-6">
                  Diyanet İşleri Başkanlığı ve Ankara Üniversitesi işbirliğiyle geliştirilen <strong>DİBRed</strong> yazılımı, 
                  gözlemsel verilerin analizi için özel olarak tasarlanmış gelişmiş bir analitik araçtır.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gold-700 dark:text-gold-400">Analiz Yöntemleri</h3>
                    <div className="space-y-3">
                      <div className="bg-islamic-50 dark:bg-islamic-900/20 p-3 rounded-lg">
                        <h4 className="font-medium text-islamic-700 dark:text-islamic-200">Ortalama Metodu</h4>
                        <p className="text-sm text-islamic-600 dark:text-islamic-300">Gözlem verilerinin istatistiksel ortalamasının alınması</p>
                      </div>
                      <div className="bg-sage-50 dark:bg-sage-900/20 p-3 rounded-lg">
                        <h4 className="font-medium text-sage-700 dark:text-sage-300">Doğrusal Analiz</h4>
                        <p className="text-sm text-islamic-600 dark:text-islamic-300">Işık değişiminin doğrusal trend analizinin yapılması</p>
                      </div>
                      <div className="bg-gold-50 dark:bg-gold-900/20 p-3 rounded-lg">
                        <h4 className="font-medium text-gold-700 dark:text-gold-300">Gauss Fonksiyonu</h4>
                        <p className="text-sm text-islamic-600 dark:text-islamic-300">Normal dağılım modellemesi ile dönüm noktası tespiti</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gold-700 dark:text-gold-400">Teknik Özellikler</h3>
                    <div className="space-y-3">
                      <div className="bg-islamic-50 dark:bg-islamic-900/20 p-3 rounded-lg">
                        <h4 className="font-medium text-islamic-700 dark:text-islamic-200">Lorentz Metodu</h4>
                        <p className="text-sm text-islamic-600 dark:text-islamic-300">Atmosferik saçılma modellemesi için gelişmiş analiz</p>
                      </div>
                      <div className="bg-sage-50 dark:bg-sage-900/20 p-3 rounded-lg">
                        <h4 className="font-medium text-sage-700 dark:text-sage-300">Türev Analizi</h4>
                        <p className="text-sm text-islamic-600 dark:text-islamic-300">Işık değişim hızının matematiksel türev hesabı</p>
                      </div>
                      <div className="bg-gold-50 dark:bg-gold-900/20 p-3 rounded-lg">
                        <h4 className="font-medium text-gold-700 dark:text-gold-300">Dönüm Noktası Tespiti</h4>
                        <p className="text-sm text-islamic-600 dark:text-islamic-300">Gece ortalama parlaklığındaki değişimin hassas belirlenmesi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bilimsel Sonuçlar */}
            <div id="bilimsel-sonuclar" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-islamic-800 dark:text-islamic-100 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-gold-600 dark:text-gold-400">📈</span>
                </span>
                Bilimsel Sonuçlar ve Hassasiyet
              </h2>

              <div className="space-y-6">
                {/* Hassasiyet Tablosu */}
                <div className="bg-white/80 dark:bg-islamic-900/60 backdrop-blur-sm rounded-xl2 border border-islamic-200 dark:border-islamic-700 overflow-hidden">
                  <div className="p-4 bg-islamic-100 dark:bg-islamic-800/50">
                    <h3 className="font-semibold text-islamic-800 dark:text-islamic-100">Gözlemsel Sonuçlar - Güneş Ufuk Açıları</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-islamic-100 dark:border-islamic-800">
                          <th className="px-4 py-3 text-left text-islamic-800 dark:text-islamic-100">Namaz Vakti</th>
                          <th className="px-4 py-3 text-center text-islamic-800 dark:text-islamic-100">Gözlenen Açı</th>
                          <th className="px-4 py-3 text-center text-islamic-800 dark:text-islamic-100">Hata Payı</th>
                          <th className="px-4 py-3 text-center text-islamic-800 dark:text-islamic-100">Teorik Değer</th>
                          <th className="px-4 py-3 text-center text-islamic-800 dark:text-islamic-100">Uyum</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-islamic-100 dark:divide-islamic-800">
                        <tr className="hover:bg-islamic-50 dark:hover:bg-islamic-800/30">
                          <td className="px-4 py-3 font-medium text-islamic-700 dark:text-islamic-200">İmsak (Sabah)</td>
                          <td className="px-4 py-3 text-center text-gold-600 dark:text-gold-400 font-mono">-17.1°</td>
                          <td className="px-4 py-3 text-center text-sage-600 dark:text-sage-400 font-mono">± 0.4°</td>
                          <td className="px-4 py-3 text-center text-islamic-600 dark:text-islamic-300 font-mono">-18°</td>
                          <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Uyumlu</td>
                        </tr>
                        <tr className="hover:bg-islamic-50 dark:hover:bg-islamic-800/30">
                          <td className="px-4 py-3 font-medium text-islamic-700 dark:text-islamic-200">Yatsı (Akşam)</td>
                          <td className="px-4 py-3 text-center text-gold-600 dark:text-gold-400 font-mono">-16.4°</td>
                          <td className="px-4 py-3 text-center text-sage-600 dark:text-sage-400 font-mono">± 0.2°</td>
                          <td className="px-4 py-3 text-center text-islamic-600 dark:text-islamic-300 font-mono">-17°</td>
                          <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Uyumlu</td>
                        </tr>
                        <tr className="hover:bg-islamic-50 dark:hover:bg-islamic-800/30 bg-gold-50/50 dark:bg-gold-900/20">
                          <td className="px-4 py-3 font-medium text-islamic-700 dark:text-islamic-200">DİB Hassas Ölçüm</td>
                          <td className="px-4 py-3 text-center text-gold-600 dark:text-gold-400 font-mono">-17.8°</td>
                          <td className="px-4 py-3 text-center text-sage-600 dark:text-sage-400 font-mono">25 saniye</td>
                          <td className="px-4 py-3 text-center text-islamic-600 dark:text-islamic-300 font-mono">-18°</td>
                          <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">✓✓ Mükemmel</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Doğu Anadolu Gözlemevi Sonuçları */}
                <div className="bg-gradient-to-r from-islamic-50 to-sage-50 dark:from-islamic-900/20 dark:to-sage-900/20 p-6 rounded-xl2 border border-islamic-200 dark:border-islamic-700">
                  <h3 className="text-lg font-semibold text-islamic-800 dark:text-islamic-100 mb-4 flex items-center">
                    <span className="mr-2">🏔️</span>
                    Doğu Anadolu Gözlemevi (DAG) Sonuçları
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-medium text-gold-700 dark:text-gold-400">Gözlemevi Özellikleri</h4>
                      <ul className="space-y-1 text-sm text-islamic-600 dark:text-islamic-300">
                        <li>• <strong>Rakım:</strong> ~3200 metre (yüksek rakım avantajı)</li>
                        <li>• <strong>Atmosfer:</strong> Düşük nem oranı ve bulutluluk</li>
                        <li>• <strong>Işık Kirliliği:</strong> Minimal seviyede</li>
                        <li>• <strong>Görüş Kalitesi:</strong> Mükemmel atmosferik şartlar</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-gold-700 dark:text-gold-400">Ölçüm Hassasiyeti</h4>
                      <ul className="space-y-1 text-sm text-islamic-600 dark:text-islamic-300">
                        <li>• <strong>ASC vs DSLR:</strong> ASC daha duyarlı sonuçlar</li>
                        <li>• <strong>Beyazlık Kaybı:</strong> +1.3 dk (±0.7 dk hata payı)</li>
                        <li>• <strong>Kızıllık Kaybı:</strong> +6.8 dk (±6.9 dk hata payı)</li>
                        <li>• <strong>Takvilim Uyumu:</strong> %99+ doğruluk oranı</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Üstünlükler */}
            <div id="ustunlukler" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-islamic-800 dark:text-islamic-100 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-gold-600 dark:text-gold-400">🏆</span>
                </span>
                Geleneksel Yöntemlere Üstünlükleri
              </h2>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl2 border border-red-200 dark:border-red-800">
                    <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-4 flex items-center">
                      <span className="mr-2">⚠️</span>
                      Geleneksel Yöntemlerin Sınırları
                    </h3>
                    <ul className="space-y-3 text-sm text-red-600 dark:text-red-300">
                      <li className="flex items-start">
                        <span className="mr-2">❌</span>
                        <span><strong>Işık Kirliliği:</strong> Şehirlerde doğru gözlem neredeyse imkansız</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">❌</span>
                        <span><strong>Subjektiflik:</strong> İnsan gözünün algı farklılıkları</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">❌</span>
                        <span><strong>Atmosferik Bağımlılık:</strong> Hava koşullarından yoğun etkilenme</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">❌</span>
                        <span><strong>Düşük Duyarlılık:</strong> İlk aydınlanma anının geç fark edilmesi</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">❌</span>
                        <span><strong>Tekrarlanabilirlik:</strong> Aynı sonuçları elde etme zorluğu</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl2 border border-green-200 dark:border-green-800">
                    <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-4 flex items-center">
                      <span className="mr-2">✅</span>
                      Modern Cihazların Avantajları
                    </h3>
                    <ul className="space-y-3 text-sm text-green-600 dark:text-green-300">
                      <li className="flex items-start">
                        <span className="mr-2">✅</span>
                        <span><strong>Objektif Ölçüm:</strong> Sayısal verilerle kesin sonuçlar</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✅</span>
                        <span><strong>Yüksek Hassasiyet:</strong> İnsan gözünden 10x daha duyarlı</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✅</span>
                        <span><strong>Çevresel Modelleme:</strong> Atmosferik koşulların analizi</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✅</span>
                        <span><strong>Tekrarlanabilirlik:</strong> %99+ tutarlı sonuçlar</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✅</span>
                        <span><strong>Işık Kirliği Toleransı:</strong> Gelişmiş filtreleme teknikleri</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gold-50 to-islamic-50 dark:from-gold-900/10 dark:to-islamic-900/10 p-6 rounded-xl2 border border-gold-200 dark:border-gold-800">
                  <h3 className="text-lg font-semibold text-islamic-800 dark:text-islamic-100 mb-4">
                    Temkin (İhtiyat Payı) İhtiyacının Azalması
                  </h3>
                  <p className="text-islamic-600 dark:text-islamic-300 leading-relaxed mb-4">
                    Modern cihazlarla yapılan hassas ölçümler sayesinde, namaz vakitlerinin belirlenmesinde 
                    geleneksel olarak uygulanan "temkin" (güvenlik payı) sürelerine olan ihtiyaç büyük ölçüde azalmış, 
                    hatta bazı durumlarda tamamen ortadan kalkmıştır.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white/60 dark:bg-islamic-900/40 p-4 rounded-lg">
                      <h4 className="font-semibold text-gold-700 dark:text-gold-400 mb-2">Geçmiş</h4>
                      <p className="text-sm text-islamic-600 dark:text-islamic-300">
                        ±10-15 dakika temkin gerekiyordu
                      </p>
                    </div>
                    <div className="bg-white/60 dark:bg-islamic-900/40 p-4 rounded-lg">
                      <h4 className="font-semibold text-gold-700 dark:text-gold-400 mb-2">Günümüz</h4>
                      <p className="text-sm text-islamic-600 dark:text-islamic-300">
                        ±25 saniye hassasiyetle ölçüm
                      </p>
                    </div>
                    <div className="bg-white/60 dark:bg-islamic-900/40 p-4 rounded-lg">
                      <h4 className="font-semibold text-gold-700 dark:text-gold-400 mb-2">Sonuç</h4>
                      <p className="text-sm text-islamic-600 dark:text-islamic-300">
                        %98+ doğruluk oranı
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sonuç */}
            <div className="bg-gradient-to-br from-islamic-50 to-gold-50 dark:from-islamic-900/30 dark:to-gold-900/30 p-8 rounded-2xl2 border border-islamic-200 dark:border-islamic-700">
              <h2 className="text-2xl font-bold text-islamic-800 dark:text-islamic-100 mb-4">
                Sonuç ve Değerlendirme
              </h2>
              <div className="space-y-4 text-islamic-700 dark:text-islamic-200">
                <p>
                  Modern astronomik cihazlar, İslami ibadet vakitlerinin belirlenmesinde devrim niteliğinde 
                  değişiklikler getirmiştir. CCD dedektörleri, DSLR kameralar ve ASC sistemleri sayesinde 
                  güneşin ufuk altındaki konumu milisaniye hassasiyetle ölçülebilmektedir.
                </p>
                <p>
                  <strong>Diyanet İşleri Başkanlığı'nın</strong> Ankara Üniversitesi ile yürüttüğü bilimsel 
                  çalışmalar, modern teknolojinin İslami fıkıh kuralları ile mükemmel uyum içinde olduğunu 
                  kanıtlamıştır. -17.8° hassasiyetle ölçülen imsak vakti, teorik -18° değeriyle neredeyse 
                  tamamen örtüşmektedir.
                </p>
                <p>
                  Bu gelişmeler, <strong>bilimsel verilerin fıkhi ölçülerle birleştirilmesi</strong> gerektiğini 
                  vurgulamakta ve modern teknolojinin İslami ibadetlerin doğru yerine getirilmesinde 
                  ne kadar önemli bir rol oynadığını göstermektedir.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center py-8">
              <p className="text-islamic-600 dark:text-islamic-300 mb-4">
                Modern teknoloji ile belirlenen hassas namaz vakitleri için:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/" 
                  className="px-6 py-3 bg-islamic-600 hover:bg-islamic-700 text-white rounded-xl2 transition-colors inline-flex items-center justify-center"
                >
                  <span className="mr-2">🕌</span>
                  Günlük Vakitler
                </Link>
                <Link 
                  href="/imsakiye" 
                  className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white rounded-xl2 transition-colors inline-flex items-center justify-center"
                >
                  <span className="mr-2">📅</span>
                  Aylık İmsakiye
                </Link>
                <Link 
                  href="/namaz-vakitleri-nasil-belirlenir" 
                  className="px-6 py-3 bg-sage-500 hover:bg-sage-600 text-white rounded-xl2 transition-colors inline-flex items-center justify-center"
                >
                  <span className="mr-2">📖</span>
                  Temel Bilgiler
                </Link>
              </div>
            </div>
          </section>
        </article>

        {/* Sidebar with Square Ads */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="sticky top-24">
            <SquareAd adSlot="6666777788" className="border border-islamic-200 dark:border-islamic-700 rounded-xl2 overflow-hidden bg-white/60 dark:bg-islamic-900/40 backdrop-blur-sm" />
          </div>
          
          <div className="mt-6">
            <SquareAd adSlot="9999000011" className="border border-islamic-200 dark:border-islamic-700 rounded-xl2 overflow-hidden bg-white/60 dark:bg-islamic-900/40 backdrop-blur-sm" />
          </div>
        </aside>
      </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-islamic-200 dark:border-islamic-700 bg-white/60 dark:bg-islamic-950/60 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center space-x-2 mb-4 hover:text-islamic-600 dark:hover:text-islamic-300 transition-colors">
              <div className="w-6 h-6 bg-islamic-600 islamic-star"></div>
              <span className="text-lg font-semibold text-islamic-800 dark:text-islamic-100">
                Vakit
              </span>
            </Link>
            <p className="text-sm text-islamic-600 dark:text-islamic-400">
              © 2024 Vakit. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}