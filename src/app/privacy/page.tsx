import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası - Vakit',
  description: 'Vakit uygulamasının gizlilik politikası ve kişisel veriler hakkında bilgiler.',
  robots: 'index, follow',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-gray-900 dark:to-emerald-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-8">
            Gizlilik Politikası
          </h1>
          
          <div className="prose prose-emerald dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                1. Genel Bilgiler
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Vakit olarak, kullanıcılarımızın gizliliğini korumaya büyük önem veriyoruz. 
                Bu gizlilik politikası, uygulamamızı kullanırken hangi bilgilerin toplandığını, 
                nasıl kullanıldığını ve korunduğunu açıklamaktadır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                2. Toplanan Bilgiler
              </h2>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• İlçe tercihiniz (localStorage&apos;da saklanır)</li>
                <li>• Tema tercihiniz (localStorage&apos;da saklanır)</li>
                <li>• Uygulama kullanım istatistikleri (Google Analytics)</li>
                <li>• Cihaz bilgileri (PWA özellikleri için)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                3. Bilgilerin Kullanımı
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Toplanan bilgiler yalnızca uygulama deneyiminizi iyileştirmek için kullanılır:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2 mt-4">
                <li>• Size en yakın ilçenin namaz vakitlerini göstermek</li>
                <li>• Tercih ettiğiniz temayı hatırlamak</li>
                <li>• Uygulama performansını analiz etmek</li>
                <li>• Teknik sorunları tespit etmek</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                4. Çerezler ve Yerel Depolama
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Uygulamamız aşağıdaki yerel depolama yöntemlerini kullanır:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2 mt-4">
                <li>• <strong>localStorage:</strong> Kullanıcı tercihlerini saklamak için</li>
                <li>• <strong>Service Worker Cache:</strong> Çevrimdışı çalışma için</li>
                <li>• <strong>Google Analytics Çerezleri:</strong> Kullanım analizi için</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                5. Üçüncü Taraf Hizmetleri
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Uygulamamız aşağıdaki üçüncü taraf hizmetleri kullanır:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2 mt-4">
                <li>• <strong>Google Analytics:</strong> Kullanım istatistikleri</li>
                <li>• <strong>Google AdSense:</strong> Reklam gösterimi</li>
                <li>• <strong>Diyanet API:</strong> Namaz vakitleri bilgileri</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                6. Veri Güvenliği
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Verilerinizi korumak için industry standartlarında güvenlik önlemleri alıyoruz:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2 mt-4">
                <li>• HTTPS şifreleme</li>
                <li>• Güvenli hosting sağlayıcısı (Vercel)</li>
                <li>• Minimal veri toplama prensibi</li>
                <li>• Düzenli güvenlik güncellemeleri</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                7. Kullanıcı Hakları
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                KVKK kapsamında aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2 mt-4">
                <li>• Verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>• İşlenen verileriniz hakkında bilgi talep etme</li>
                <li>• Verilerinizin silinmesini talep etme</li>
                <li>• Verilerin düzeltilmesini talep etme</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                8. İletişim
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:
              </p>
              <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <p className="text-emerald-700 dark:text-emerald-300">
                  E-posta: privacy@vakit.istanbul<br />
                  Web: vakit.istanbul/contact
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                9. Değişiklikler
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Bu gizlilik politikası gerektiğinde güncellenebilir. Önemli değişiklikler 
                durumunda kullanıcılarımız bilgilendirilecektir.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}