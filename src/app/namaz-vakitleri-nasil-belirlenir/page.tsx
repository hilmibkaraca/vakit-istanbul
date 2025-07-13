/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { ResponsiveAd, SquareAd } from '@/components/AdSense';

export const metadata: Metadata = {
  title: 'Namaz Vakitleri Nasıl Belirlenir? | Vakit İstanbul',
  description: 'İslam dininde namaz vakitlerinin tarihçesi, hesaplama yöntemleri ve Diyanet İşleri Başkanlığı ile diğer kurumların farklı yaklaşımları hakkında detaylı bilgi.',
  keywords: 'namaz vakitleri, güneş açısı, Diyanet namaz vakitleri, imsak vakti hesaplama, fecir, şafak, İslam astronomisi, ilm-i mikât',
  authors: [{ name: 'Vakit İstanbul' }],
  openGraph: {
    title: 'Namaz Vakitleri Nasıl Belirlenir? | Vakit İstanbul',
    description: 'İslam dininde namaz vakitlerinin tarihçesi, hesaplama yöntemleri ve farklı kurumların yaklaşımları',
    url: 'https://vakit.istanbul/namaz-vakitleri-nasil-belirlenir',
    siteName: 'Vakit İstanbul',
    locale: 'tr_TR',
    type: 'article',
  }
};

export default function NamazVakitleriBilgiPage() {
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
                    Vakit İstanbul
                  </h1>
                  <p className="text-sm text-islamic-600 dark:text-islamic-300">
                    Namaz Vakitleri Bilgi
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
              Namaz Vakitleri Nasıl Belirlenir?
            </h1>
            <p className="text-lg text-islamic-600 dark:text-islamic-300 leading-relaxed">
              İslam dininde namaz vakitlerinin doğru tespiti, ibadetlerin sahih olması açısından büyük önem taşır. 
              Güneş'in gökyüzündeki konumuna göre belirlenen bu vakitler, asırlardır İslam âlimleri tarafından 
              titizlikle hesaplanmaktadır.
            </p>
          </div>

          {/* İçindekiler */}
          <div className="bg-sage-50 dark:bg-sage-900/20 p-6 rounded-xl2 mb-8 border border-sage-200 dark:border-sage-700">
            <h2 className="text-xl font-semibold text-islamic-800 dark:text-islamic-100 mb-4">İçindekiler</h2>
            <nav className="space-y-2">
              <a href="#tarihce" className="block text-islamic-600 dark:text-islamic-300 hover:text-islamic-800 dark:hover:text-islamic-100 transition-colors">
                → Namaz Vakitlerinin Tarihçesi
              </a>
              <a href="#temel-kavramlar" className="block text-islamic-600 dark:text-islamic-300 hover:text-islamic-800 dark:hover:text-islamic-100 transition-colors">
                → Temel Kavramlar
              </a>
              <a href="#hesaplama-yontemleri" className="block text-islamic-600 dark:text-islamic-300 hover:text-islamic-800 dark:hover:text-islamic-100 transition-colors">
                → Günümüzde Hesaplama Yöntemleri
              </a>
              <a href="#kurumlar" className="block text-islamic-600 dark:text-islamic-300 hover:text-islamic-800 dark:hover:text-islamic-100 transition-colors">
                → Kurumların Farklı Yaklaşımları
              </a>
            </nav>
          </div>

          {/* Content Sections */}
          <section className="space-y-8">
            {/* Giriş */}
            <div className="bg-white/60 dark:bg-islamic-900/40 p-6 rounded-xl2 backdrop-blur-sm border border-islamic-200 dark:border-islamic-700">
              <p className="text-islamic-700 dark:text-islamic-200 leading-relaxed">
                Kur'an-ı Kerim'de namazın belirli vakitleri olduğu açıkça belirtilmiş, ancak bu vakitlerin detayları 
                Hz. Peygamber (s.a.v.) tarafından uygulamalı olarak gösterilmiştir. İslam tarihinde namaz vakitlerinin 
                belirlenmesi, önce gözleme dayalı olarak başlamış, sonrasında astronomik hesaplamalarla geliştirilmiştir.
              </p>
            </div>

            {/* Tarihçe */}
            <div id="tarihce" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-islamic-800 dark:text-islamic-100 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-gold-600 dark:text-gold-400">📜</span>
                </span>
                Namaz Vakitlerinin Tarihçesi
              </h2>
              
              <div className="space-y-4">
                <div className="bg-white/60 dark:bg-islamic-900/40 p-6 rounded-xl2 backdrop-blur-sm border border-islamic-200 dark:border-islamic-700">
                  <h3 className="text-lg font-semibold text-islamic-700 dark:text-islamic-200 mb-3">
                    Gözlem Dönemi (Hz. Peygamber'den 8. Yüzyıla)
                  </h3>
                  <p className="text-islamic-600 dark:text-islamic-300 leading-relaxed">
                    Hz. Peygamber döneminden Miladi 8. yüzyıla kadar namaz vakitleri doğrudan <strong>gözleme</strong> dayanıyordu. 
                    Görevli kişiler (müezzinler), Cibril hadisine göre güneşin konumunu gözlemleyerek vakitleri belirliyordu. 
                    Doğru tespit için gözlemcinin yüksek bir noktada olması, ufkun açık olması ve hava şartlarının uygun olması gerekiyordu.
                  </p>
                </div>

                <div className="bg-white/60 dark:bg-islamic-900/40 p-6 rounded-xl2 backdrop-blur-sm border border-islamic-200 dark:border-islamic-700">
                  <h3 className="text-lg font-semibold text-islamic-700 dark:text-islamic-200 mb-3">
                    İlm-i Mîkât ve Rasathaneler
                  </h3>
                  <p className="text-islamic-600 dark:text-islamic-300 leading-relaxed">
                    İslam medeniyetinde vakit tayini önemli bir ilim dalı haline gelmiş ve buna <strong>"ilm-i mîkât"</strong> adı verilmiştir. 
                    Abbasi Halifesi Me'mun tarafından 813 yılında ilk rasathaneler kurulduktan sonra, namaz vakitleri astronomik 
                    hesaplamalarla belirlenmeye başlanmıştır.
                  </p>
                </div>

                <div className="bg-white/60 dark:bg-islamic-900/40 p-6 rounded-xl2 backdrop-blur-sm border border-islamic-200 dark:border-islamic-700">
                  <h3 className="text-lg font-semibold text-islamic-700 dark:text-islamic-200 mb-3">
                    Osmanlı'da Muvakkithaneler
                  </h3>
                  <p className="text-islamic-600 dark:text-islamic-300 leading-relaxed">
                    Osmanlı İmparatorluğu'nda camilerin yanında <strong>muvakkithaneler</strong> kurulmuştur. Muvakkitler (vakit uzmanları), 
                    güneş saatleri ve özel aletlerle namaz vakitlerini hesaplayıp halka bildirmişlerdir. Ayrıca devletin resmi 
                    takvimlerini de hazırlamışlardır.
                  </p>
                </div>
              </div>
            </div>

            {/* Temel Kavramlar */}
            <div id="temel-kavramlar" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-islamic-800 dark:text-islamic-100 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-gold-600 dark:text-gold-400">📚</span>
                </span>
                Temel Kavramlar
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/60 dark:bg-islamic-900/40 p-6 rounded-xl2 backdrop-blur-sm border border-islamic-200 dark:border-islamic-700">
                  <h3 className="text-lg font-semibold text-gold-700 dark:text-gold-400 mb-2">Fecir (Tan)</h3>
                  <p className="text-islamic-600 dark:text-islamic-300">
                    Sabah ışığı, güneş doğmadan önce ortalığın ağarmaya başlaması. İki türü vardır:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li><strong>Fecr-i Kâzib:</strong> Yalancı tan, dikey ışık</li>
                    <li><strong>Fecr-i Sâdık:</strong> Gerçek tan, yatay ışık (imsak vakti)</li>
                  </ul>
                </div>

                <div className="bg-white/60 dark:bg-islamic-900/40 p-6 rounded-xl2 backdrop-blur-sm border border-islamic-200 dark:border-islamic-700">
                  <h3 className="text-lg font-semibold text-gold-700 dark:text-gold-400 mb-2">Şafak</h3>
                  <p className="text-islamic-600 dark:text-islamic-300">
                    Güneş battıktan sonra batı ufkunda beliren kızıllık veya beyazlık. Yatsı vaktinin belirlenmesinde önemlidir.
                  </p>
                </div>

                <div className="bg-white/60 dark:bg-islamic-900/40 p-6 rounded-xl2 backdrop-blur-sm border border-islamic-200 dark:border-islamic-700">
                  <h3 className="text-lg font-semibold text-gold-700 dark:text-gold-400 mb-2">Zewal</h3>
                  <p className="text-islamic-600 dark:text-islamic-300">
                    Güneşin tam tepe noktasından batıya kayması. Öğle vaktinin başlangıcıdır.
                  </p>
                </div>

                <div className="bg-white/60 dark:bg-islamic-900/40 p-6 rounded-xl2 backdrop-blur-sm border border-islamic-200 dark:border-islamic-700">
                  <h3 className="text-lg font-semibold text-gold-700 dark:text-gold-400 mb-2">Temkin</h3>
                  <p className="text-islamic-600 dark:text-islamic-300">
                    İhtiyat amacıyla namaz vakitlerine eklenen veya çıkarılan süreler. Vaktin kesin girdiğinden emin olmak için uygulanan güvenlik payı.
                  </p>
                </div>
              </div>
            </div>

            {/* Günümüzde Hesaplama */}
            <div id="hesaplama-yontemleri" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-islamic-800 dark:text-islamic-100 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-gold-600 dark:text-gold-400">🌐</span>
                </span>
                Günümüzde Hesaplama Yöntemleri
              </h2>

              <div className="bg-gold-50 dark:bg-gold-900/10 p-6 rounded-xl2 border border-gold-200 dark:border-gold-800 mb-6">
                <p className="text-islamic-700 dark:text-islamic-200 leading-relaxed">
                  Modern dönemde namaz vakitleri, <strong>astronomik hesaplamalar</strong> ve <strong>güneşin ufuk açısı</strong> kullanılarak 
                  belirlenmektedir. Her namaz vakti için güneşin ufka göre belirli bir açıda olması gerekmektedir:
                </p>
              </div>

              <div className="space-y-4">
                {/* Namaz Vakitleri Tablosu */}
                <div className="overflow-x-auto">
                  <table className="w-full bg-white/80 dark:bg-islamic-900/60 backdrop-blur-sm rounded-xl2 overflow-hidden">
                    <thead>
                      <tr className="bg-islamic-100 dark:bg-islamic-800/50">
                        <th className="px-4 py-3 text-left text-islamic-800 dark:text-islamic-100">Namaz Vakti</th>
                        <th className="px-4 py-3 text-left text-islamic-800 dark:text-islamic-100">Güneş Açısı</th>
                        <th className="px-4 py-3 text-left text-islamic-800 dark:text-islamic-100">Açıklama</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-islamic-100 dark:divide-islamic-800">
                      <tr>
                        <td className="px-4 py-3 font-medium text-islamic-700 dark:text-islamic-200">İmsak (Sabah)</td>
                        <td className="px-4 py-3 text-gold-600 dark:text-gold-400 font-mono">-18°</td>
                        <td className="px-4 py-3 text-islamic-600 dark:text-islamic-300">Fecr-i sâdık, ufukta yatay beyazlık</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-islamic-700 dark:text-islamic-200">Güneş</td>
                        <td className="px-4 py-3 text-gold-600 dark:text-gold-400 font-mono">-0°50'</td>
                        <td className="px-4 py-3 text-islamic-600 dark:text-islamic-300">Güneşin üst kenarı ufukta</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-islamic-700 dark:text-islamic-200">Öğle</td>
                        <td className="px-4 py-3 text-gold-600 dark:text-gold-400 font-mono">Zewal</td>
                        <td className="px-4 py-3 text-islamic-600 dark:text-islamic-300">Güneş meridyenden geçtikten sonra</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-islamic-700 dark:text-islamic-200">İkindi</td>
                        <td className="px-4 py-3 text-gold-600 dark:text-gold-400 font-mono">1 misli gölge</td>
                        <td className="px-4 py-3 text-islamic-600 dark:text-islamic-300">Cismin gölgesi kendi boyuna eşit</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-islamic-700 dark:text-islamic-200">Akşam</td>
                        <td className="px-4 py-3 text-gold-600 dark:text-gold-400 font-mono">-0°50'</td>
                        <td className="px-4 py-3 text-islamic-600 dark:text-islamic-300">Güneşin üst kenarı ufukta kaybolur</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-islamic-700 dark:text-islamic-200">Yatsı</td>
                        <td className="px-4 py-3 text-gold-600 dark:text-gold-400 font-mono">-17°</td>
                        <td className="px-4 py-3 text-islamic-600 dark:text-islamic-300">Şafak kaybolur</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Mid-Article Ad */}
            <div className="my-8 flex justify-center">
              <ResponsiveAd adSlot="1111222233" className="border border-islamic-200 dark:border-islamic-700 rounded-xl2 overflow-hidden bg-white/60 dark:bg-islamic-900/40 backdrop-blur-sm" />
            </div>

            {/* Kurumlar */}
            <div id="kurumlar" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-islamic-800 dark:text-islamic-100 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-gold-600 dark:text-gold-400">🏛️</span>
                </span>
                Kurumların Farklı Yaklaşımları
              </h2>

              <div className="space-y-6">
                {/* Diyanet */}
                <div className="bg-white/60 dark:bg-islamic-900/40 p-6 rounded-xl2 backdrop-blur-sm border-2 border-islamic-600 dark:border-islamic-400">
                  <h3 className="text-xl font-bold text-islamic-800 dark:text-islamic-100 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-islamic-600 rounded-full mr-2"></span>
                    Diyanet İşleri Başkanlığı
                  </h3>
                  <div className="space-y-3 text-islamic-600 dark:text-islamic-300">
                    <p>
                      Türkiye'de en yaygın kullanılan takvimdir. Modern teknoloji ve klasik fıkıh görüşlerini birleştirerek 
                      hesaplama yapar.
                    </p>
                    <div className="bg-islamic-50 dark:bg-islamic-900/30 p-4 rounded-lg">
                      <p className="font-medium text-islamic-700 dark:text-islamic-200 mb-2">Özellikler:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• İmsak: Güneş -18° (aletsel gözlem)</li>
                        <li>• Yatsı: Güneş -17°</li>
                        <li>• Temkin süreleri azaltılmış</li>
                        <li>• Işık kirliliği dikkate alınmış</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Süleymaniye */}
                <div className="bg-white/60 dark:bg-islamic-900/40 p-6 rounded-xl2 backdrop-blur-sm border border-islamic-200 dark:border-islamic-700">
                  <h3 className="text-xl font-bold text-islamic-800 dark:text-islamic-100 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-2"></span>
                    Süleymaniye Vakfı
                  </h3>
                  <div className="space-y-3 text-islamic-600 dark:text-islamic-300">
                    <p>
                      Çıplak gözle gözlemi esas alır. Diyanet'ten yaklaşık 40-60 dakika geç imsak vakti verir.
                    </p>
                    <div className="bg-sage-50 dark:bg-sage-900/30 p-4 rounded-lg">
                      <p className="font-medium text-islamic-700 dark:text-islamic-200 mb-2">Özellikler:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• İmsak: Güneş -8.5° (kızıllık başlangıcı)</li>
                        <li>• Namazları cem etme imkanı</li>
                        <li>• Şehir içinde gözlem yapılabilir görüşü</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Fazilet */}
                <div className="bg-white/60 dark:bg-islamic-900/40 p-6 rounded-xl2 backdrop-blur-sm border border-islamic-200 dark:border-islamic-700">
                  <h3 className="text-xl font-bold text-islamic-800 dark:text-islamic-100 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-gold-600 rounded-full mr-2"></span>
                    Fazilet Neşriyat / Türkiye Takvimi
                  </h3>
                  <div className="space-y-3 text-islamic-600 dark:text-islamic-300">
                    <p>
                      1982 öncesi Diyanet uygulamalarını devam ettirir. Daha ihtiyatlı bir yaklaşım benimser.
                    </p>
                    <div className="bg-gold-50 dark:bg-gold-900/30 p-4 rounded-lg">
                      <p className="font-medium text-islamic-700 dark:text-islamic-200 mb-2">Özellikler:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• İmsak: Güneş -19°</li>
                        <li>• Tüm vakitlere temkin eklenir</li>
                        <li>• İmsak'a +10 dk, Güneş'e -5 dk</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sonuç */}
            <div className="bg-gradient-to-br from-islamic-50 to-gold-50 dark:from-islamic-900/30 dark:to-gold-900/30 p-8 rounded-2xl2 border border-islamic-200 dark:border-islamic-700">
              <h2 className="text-2xl font-bold text-islamic-800 dark:text-islamic-100 mb-4">
                Sonuç ve Öneriler
              </h2>
              <div className="space-y-4 text-islamic-700 dark:text-islamic-200">
                <p>
                  Namaz vakitlerindeki farklılıklar, fıkhi yorumlar ve gözlem yöntemlerindeki tercihlerden kaynaklanmaktadır. 
                  Her kurum kendi metodolojisini geliştirmiş ve bunu ilmi gerekçelerle desteklemiştir.
                </p>
                <p>
                  <strong>Vakit İstanbul</strong> olarak, Diyanet İşleri Başkanlığı'nın hesaplama yöntemini kullanmaktayız. 
                  Bu tercihimizin nedenleri:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Modern teknoloji ve klasik fıkıh görüşlerinin dengeli birleşimi</li>
                  <li>Aletsel gözlemlerle desteklenen güvenilir veriler</li>
                  <li>Türkiye'de en yaygın kabul gören uygulama</li>
                  <li>İhtiyat ile kolaylık arasında denge</li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center py-8">
              <p className="text-islamic-600 dark:text-islamic-300 mb-4">
                İstanbul'un güncel namaz vakitleri için:
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
              </div>
            </div>
          </section>
        </article>

        {/* Sidebar with Square Ads */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="sticky top-24">
            <SquareAd adSlot="4444555566" className="border border-islamic-200 dark:border-islamic-700 rounded-xl2 overflow-hidden bg-white/60 dark:bg-islamic-900/40 backdrop-blur-sm" />
          </div>
          
          <div className="mt-6">
            <SquareAd adSlot="7777888899" className="border border-islamic-200 dark:border-islamic-700 rounded-xl2 overflow-hidden bg-white/60 dark:bg-islamic-900/40 backdrop-blur-sm" />
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
                Vakit İstanbul
              </span>
            </Link>
            <p className="text-sm text-islamic-600 dark:text-islamic-400">
              © 2024 Vakit İstanbul. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}