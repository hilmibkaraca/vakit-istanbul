import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim - Vakit',
  description: 'Vakit ile iletişime geçin. Geri bildirimlerinizi ve önerilerinizi bizimle paylaşın.',
  robots: 'index, follow',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-gray-900 dark:to-emerald-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-8">
            İletişim
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* İletişim Bilgileri */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                Bizimle İletişime Geçin
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📧</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">E-posta</h3>
                    <p className="text-gray-600 dark:text-gray-300">info@vakit.istanbul</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Genel sorular ve öneriler için
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🔒</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">Gizlilik</h3>
                    <p className="text-gray-600 dark:text-gray-300">privacy@vakit.istanbul</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Gizlilik ve veri koruma konuları için
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🐛</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">Teknik Destek</h3>
                    <p className="text-gray-600 dark:text-gray-300">support@vakit.istanbul</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Hata bildirimleri ve teknik sorunlar için
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">Öneriler</h3>
                    <p className="text-gray-600 dark:text-gray-300">feedback@vakit.istanbul</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Yeni özellik önerileri ve geri bildirimler için
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <h3 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
                  Hızlı Yanıt Süresi
                </h3>
                <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                  E-postalarınıza genellikle 24 saat içinde yanıt veriyoruz.
                  Acil teknik sorunlar için support@vakit.istanbul adresini kullanın.
                </p>
              </div>
            </div>

            {/* İletişim Formu */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                Mesaj Gönderin
              </h2>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    İsim
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Konu
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    <option value="">Konu seçin</option>
                    <option value="feedback">Geri bildirim</option>
                    <option value="bug">Hata raporu</option>
                    <option value="feature">Özellik önerisi</option>
                    <option value="privacy">Gizlilik sorunu</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mesaj
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Mesajınızı buraya yazın..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Mesaj Gönder
                </button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  <strong>Not:</strong> Bu form henüz aktif değildir. 
                  Lütfen yukarıdaki e-posta adreslerini kullanarak bizimle iletişime geçin.
                </p>
              </div>
            </div>
          </div>

          {/* SSS Bölümü */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              Sık Sorulan Sorular
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                  Namaz vakitleri ne kadar doğru?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Vakitlerimiz Diyanet İşleri Başkanlığı&apos;nın resmi verilerini kullanır. 
                  Dakika hassasiyetinde doğru bilgiler sağlanmaya çalışılır.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                  Uygulama çevrimdışı çalışır mı?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Evet, PWA teknolojisi sayesinde uygulama çevrimdışı da çalışır. 
                  Son indirilen vakitler gösterilir.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                  Bildirim almak için ne yapmalıyım?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Tarayıcınızdan bildirim izni vererek namaz vakitlerine yakın bildirim alabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}