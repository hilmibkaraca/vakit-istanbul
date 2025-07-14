'use client';

import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { PrayerTimes } from '@/types';
import { PRAYER_NAMES, PRAYER_ICONS } from '@/lib/constants';
import ThemeToggle from '@/components/ThemeToggle';
import DistrictSelector from '@/components/DistrictSelector';
import { BannerAd, ResponsiveAd } from '@/components/AdSense';

export default function Home() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState('ISTANBUL');
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activePrayer, setActivePrayer] = useState<string | null>(null);

  const fetchPrayerTimes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/prayer-times?district=${selectedDistrict}`);
      const data = await response.json();
      setPrayerTimes(data.data);
    } catch (error) {
      console.error('Failed to fetch prayer times:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedDistrict]);

  const findActivePrayer = useCallback(() => {
    if (!prayerTimes) return;

    const now = currentTime;
    const currentTimeStr = format(now, 'HH:mm');
    const times = prayerTimes.times;

    const prayerOrder = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
    
    for (let i = 0; i < prayerOrder.length; i++) {
      const prayerTime = times[prayerOrder[i] as keyof typeof times];
      if (currentTimeStr < prayerTime) {
        setActivePrayer(prayerOrder[i]);
        return;
      }
    }
    
    setActivePrayer('fajr'); // Next day's fajr
  }, [prayerTimes, currentTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('selectedDistrict');
    if (saved) {
      setSelectedDistrict(saved);
    }
  }, []);

  useEffect(() => {
    fetchPrayerTimes();
  }, [fetchPrayerTimes]);

  useEffect(() => {
    if (prayerTimes) {
      findActivePrayer();
    }
  }, [prayerTimes, currentTime, findActivePrayer]);

  const getTimeRemaining = (prayerName: string) => {
    if (!prayerTimes) return '';
    
    const prayerTime = prayerTimes.times[prayerName as keyof typeof prayerTimes.times];
    const [hours, minutes] = prayerTime.split(':').map(Number);
    
    const prayerDate = new Date();
    prayerDate.setHours(hours, minutes, 0, 0);
    
    if (prayerDate < currentTime && prayerName === 'fajr') {
      prayerDate.setDate(prayerDate.getDate() + 1);
    }
    
    const diff = prayerDate.getTime() - currentTime.getTime();
    
    if (diff <= 0) return 'Geçti';
    
    const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hoursLeft > 0) {
      return `${hoursLeft}s ${minutesLeft}dk`;
    }
    return `${minutesLeft}dk`;
  };

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    localStorage.setItem('selectedDistrict', district);
  };

  if (loading) {
    return (
      <div className="min-h-screen islamic-pattern flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-islamic-300 border-t-islamic-600 rounded-full animate-spin"></div>
          <p className="text-islamic-700 dark:text-islamic-300 font-medium">Vakitler yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen islamic-pattern">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-islamic-950/90 backdrop-blur-md border-b border-islamic-200 dark:border-islamic-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-islamic-gradient rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-islamic-600 islamic-star"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-islamic-800 dark:text-islamic-100">
                  Vakit İstanbul
                </h1>
                <p className="text-sm text-islamic-600 dark:text-islamic-300">
                  {format(currentTime, 'dd MMMM yyyy, EEEE', { locale: tr })}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-3">
              <DistrictSelector 
                selectedDistrict={selectedDistrict}
                onDistrictChange={handleDistrictChange}
              />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Header Banner Ad */}
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="flex justify-center">
          <BannerAd adSlot="home-header-banner" className="border border-islamic-200 dark:border-islamic-700 rounded-xl2 overflow-hidden" />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Current Time & Next Prayer */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="text-6xl font-mono font-bold text-islamic-800 dark:text-islamic-100 mb-4 tracking-wider">
              {format(currentTime, 'HH:mm')}
            </div>
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-gold-500 rounded-full animate-pulse-soft"></div>
          </div>
          
          {activePrayer && (
            <div className="mt-4 p-4 bg-white/60 dark:bg-islamic-900/60 backdrop-blur-sm rounded-2xl2 inline-block border border-islamic-200 dark:border-islamic-700">
              <p className="text-islamic-600 dark:text-islamic-300 text-sm mb-1">Sonraki Vakit</p>
              <div className="flex items-center justify-center space-x-3">
                <span className="text-2xl">
                  {PRAYER_ICONS[activePrayer as keyof typeof PRAYER_ICONS]}
                </span>
                <div>
                  <p className="text-xl font-semibold text-islamic-800 dark:text-islamic-100">
                    {PRAYER_NAMES.TR[activePrayer as keyof typeof PRAYER_NAMES.TR]}
                  </p>
                  <p className="text-gold-600 dark:text-gold-400 font-medium">
                    {getTimeRemaining(activePrayer)} kaldı
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Prayer Times Grid */}
        {prayerTimes && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {Object.entries(prayerTimes.times).map(([prayer, time]) => {
              const isActive = prayer === activePrayer;
              const timeRemaining = getTimeRemaining(prayer);
              const isPassed = timeRemaining === 'Geçti';
              
              return (
                <div
                  key={prayer}
                  className={`relative prayer-accent group transition-all duration-300 ${
                    isActive
                      ? 'prayer-glow-active bg-gradient-to-br from-gold-100 to-gold-200 dark:from-gold-900/30 dark:to-gold-800/30 transform scale-105'
                      : isPassed
                      ? 'bg-sage-100/50 dark:bg-sage-900/30'
                      : 'prayer-glow bg-white/80 dark:bg-islamic-900/50 hover:bg-islamic-50 dark:hover:bg-islamic-900/70'
                  } rounded-xl2 p-6 backdrop-blur-sm border border-islamic-200 dark:border-islamic-700 cursor-pointer`}
                >
                  <div className="text-center">
                    <div className={`text-3xl mb-3 transition-transform group-hover:scale-110 ${
                      isActive ? 'animate-pulse-soft' : ''
                    }`}>
                      {PRAYER_ICONS[prayer as keyof typeof PRAYER_ICONS]}
                    </div>
                    <h3 className={`font-semibold text-lg mb-2 ${
                      isActive 
                        ? 'text-gold-800 dark:text-gold-200' 
                        : isPassed 
                        ? 'text-sage-500 dark:text-sage-400'
                        : 'text-islamic-800 dark:text-islamic-100'
                    }`}>
                      {PRAYER_NAMES.TR[prayer as keyof typeof PRAYER_NAMES.TR]}
                    </h3>
                    <div className={`text-2xl font-mono font-bold mb-2 ${
                      isActive 
                        ? 'text-gold-700 dark:text-gold-300' 
                        : isPassed 
                        ? 'text-sage-600 dark:text-sage-400'
                        : 'text-islamic-700 dark:text-islamic-200'
                    }`}>
                      {time}
                    </div>
                    <div className={`text-sm ${
                      isActive 
                        ? 'text-gold-600 dark:text-gold-400 font-medium' 
                        : isPassed 
                        ? 'text-sage-500 dark:text-sage-500'
                        : 'text-islamic-500 dark:text-islamic-400'
                    }`}>
                      {timeRemaining}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Hijri Date Card */}
        {prayerTimes && (
          <div className="max-w-md mx-auto mb-8">
            <div className="geometric-border bg-white/80 dark:bg-islamic-900/60 backdrop-blur-sm rounded-2xl2 p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="w-8 h-8 bg-gold-500 crescent opacity-80"></div>
              </div>
              <h3 className="text-lg font-semibold text-islamic-800 dark:text-islamic-100 mb-2">
                Hicri Tarih
              </h3>
              <p className="text-gold-600 dark:text-gold-400 font-medium arabic-text text-lg">
                {prayerTimes.hijriDate}
              </p>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <button className="flex flex-col items-center space-y-2 p-4 bg-white/60 dark:bg-islamic-900/40 backdrop-blur-sm rounded-xl2 border border-islamic-200 dark:border-islamic-700 hover:bg-islamic-50 dark:hover:bg-islamic-900/60 transition-all duration-200">
            <span className="text-2xl">🧭</span>
            <span className="text-sm font-medium text-islamic-700 dark:text-islamic-300">Kıble Yönü</span>
          </button>
          
          <a href="/imsakiye" className="flex flex-col items-center space-y-2 p-4 bg-white/60 dark:bg-islamic-900/40 backdrop-blur-sm rounded-xl2 border border-islamic-200 dark:border-islamic-700 hover:bg-islamic-50 dark:hover:bg-islamic-900/60 transition-all duration-200">
            <span className="text-2xl">📅</span>
            <span className="text-sm font-medium text-islamic-700 dark:text-islamic-300">İmsakiye</span>
          </a>

          <a href="/blog" className="flex flex-col items-center space-y-2 p-4 bg-white/60 dark:bg-islamic-900/40 backdrop-blur-sm rounded-xl2 border border-islamic-200 dark:border-islamic-700 hover:bg-islamic-50 dark:hover:bg-islamic-900/60 transition-all duration-200">
            <span className="text-2xl">📖</span>
            <span className="text-sm font-medium text-islamic-700 dark:text-islamic-300">Blog</span>
          </a>
        </div>

        {/* Blog Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-islamic-800 dark:text-islamic-100 mb-4">
              Namaz ve İbadet Rehberimiz
            </h2>
            <p className="text-islamic-600 dark:text-islamic-300 max-w-2xl mx-auto">
              İslami ibadet hayatınızı kolaylaştıracak kapsamlı rehberler, güncel bilgiler ve pratik tavsiyeler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Featured Blog Posts */}
            <a href="/blog/sabah-namazi-saat-kacta" className="group block bg-white/60 dark:bg-islamic-900/40 backdrop-blur-sm rounded-xl2 border border-islamic-200 dark:border-islamic-700 hover:bg-islamic-50 dark:hover:bg-islamic-900/60 transition-all duration-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">🌅</span>
                  <span className="text-xs bg-islamic-100 dark:bg-islamic-800 text-islamic-600 dark:text-islamic-300 px-2 py-1 rounded-full">
                    Namaz Vakitleri
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-islamic-800 dark:text-islamic-100 group-hover:text-islamic-600 dark:group-hover:text-islamic-300 mb-2">
                  Sabah Namazı Saat Kaçta?
                </h3>
                <p className="text-sm text-islamic-600 dark:text-islamic-300 leading-relaxed">
                  İstanbul&apos;da sabah namazı vakitleri, tüm ilçeler için güncel saatler ve pratik öneriler.
                </p>
              </div>
            </a>

            <a href="/blog/cuma-namazi-vakti-istanbul" className="group block bg-white/60 dark:bg-islamic-900/40 backdrop-blur-sm rounded-xl2 border border-islamic-200 dark:border-islamic-700 hover:bg-islamic-50 dark:hover:bg-islamic-900/60 transition-all duration-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">🕌</span>
                  <span className="text-xs bg-gold-100 dark:bg-gold-900/30 text-gold-600 dark:text-gold-400 px-2 py-1 rounded-full">
                    Cuma Namazı
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-islamic-800 dark:text-islamic-100 group-hover:text-islamic-600 dark:group-hover:text-islamic-300 mb-2">
                  Cuma Namazı Rehberi
                </h3>
                <p className="text-sm text-islamic-600 dark:text-islamic-300 leading-relaxed">
                  İstanbul&apos;da cuma namazı saatleri, popüler camiler ve bilinmesi gerekenler.
                </p>
              </div>
            </a>

            <a href="/blog/namaz-vakti-gecince-ne-yapilir" className="group block bg-white/60 dark:bg-islamic-900/40 backdrop-blur-sm rounded-xl2 border border-islamic-200 dark:border-islamic-700 hover:bg-islamic-50 dark:hover:bg-islamic-900/60 transition-all duration-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">⏰</span>
                  <span className="text-xs bg-sage-100 dark:bg-sage-900/30 text-sage-600 dark:text-sage-400 px-2 py-1 rounded-full">
                    Kaza Namazı
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-islamic-800 dark:text-islamic-100 group-hover:text-islamic-600 dark:group-hover:text-islamic-300 mb-2">
                  Namaz Vakti Geçince Ne Yapılır?
                </h3>
                <p className="text-sm text-islamic-600 dark:text-islamic-300 leading-relaxed">
                  Kaza namazı nasıl kılınır, hangi durumlarda namaz kazaya kalır rehberi.
                </p>
              </div>
            </a>

            <a href="/blog/iftar-vakti-hesaplama-2025" className="group block bg-white/60 dark:bg-islamic-900/40 backdrop-blur-sm rounded-xl2 border border-islamic-200 dark:border-islamic-700 hover:bg-islamic-50 dark:hover:bg-islamic-900/60 transition-all duration-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">🌙</span>
                  <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-full">
                    Ramazan
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-islamic-800 dark:text-islamic-100 group-hover:text-islamic-600 dark:group-hover:text-islamic-300 mb-2">
                  İftar Vakti Hesaplama 2025
                </h3>
                <p className="text-sm text-islamic-600 dark:text-islamic-300 leading-relaxed">
                  2025 Ramazan ayı İstanbul iftar vakitleri, sahur saatleri ve oruç rehberi.
                </p>
              </div>
            </a>

            <a href="/blog/iste-namaz-kilmak-icin-izin-hakkiniz" className="group block bg-white/60 dark:bg-islamic-900/40 backdrop-blur-sm rounded-xl2 border border-islamic-200 dark:border-islamic-700 hover:bg-islamic-50 dark:hover:bg-islamic-900/60 transition-all duration-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">⚖️</span>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                    Yasal Haklar
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-islamic-800 dark:text-islamic-100 group-hover:text-islamic-600 dark:group-hover:text-islamic-300 mb-2">
                  İşte Namaz İzin Hakkınız
                </h3>
                <p className="text-sm text-islamic-600 dark:text-islamic-300 leading-relaxed">
                  Çalışanların namaz kılmak için izin hakları ve yasal düzenlemeler.
                </p>
              </div>
            </a>

            <a href="/blog/yolculukta-namaz-rehberi" className="group block bg-white/60 dark:bg-islamic-900/40 backdrop-blur-sm rounded-xl2 border border-islamic-200 dark:border-islamic-700 hover:bg-islamic-50 dark:hover:bg-islamic-900/60 transition-all duration-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">✈️</span>
                  <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
                    Seyahat
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-islamic-800 dark:text-islamic-100 group-hover:text-islamic-600 dark:group-hover:text-islamic-300 mb-2">
                  Yolculukta Namaz Rehberi
                </h3>
                <p className="text-sm text-islamic-600 dark:text-islamic-300 leading-relaxed">
                  Seferî namaz, birleştirme kuralları ve yolculuk halinde ibadet.
                </p>
              </div>
            </a>
          </div>

          <div className="text-center">
            <a href="/blog" className="inline-flex items-center space-x-2 px-6 py-3 bg-islamic-gradient text-white rounded-xl2 hover:shadow-lg transition-all duration-200 font-medium">
              <span>Tüm Blog Yazılarını Görüntüle</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Mid-page Responsive Ad */}
        <div className="my-12 flex justify-center">
          <ResponsiveAd adSlot="home-mid-responsive" className="border border-islamic-200 dark:border-islamic-700 rounded-xl2 overflow-hidden bg-white/60 dark:bg-islamic-900/40 backdrop-blur-sm" />
        </div>

        {/* Bilgi Bölümü */}
        <div className="mt-12 max-w-4xl mx-auto space-y-4">
          <a 
            href="/namaz-vakitleri-nasil-belirlenir" 
            className="block p-6 bg-white/60 dark:bg-islamic-900/40 backdrop-blur-sm rounded-xl2 border border-islamic-200 dark:border-islamic-700 hover:bg-islamic-50 dark:hover:bg-islamic-900/60 transition-all duration-200 group"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/30 transition-colors">
                <span className="text-2xl text-gold-600 dark:text-gold-400">📖</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-islamic-800 dark:text-islamic-100 group-hover:text-islamic-600 dark:group-hover:text-islamic-300 transition-colors">
                  Namaz Vakitleri Nasıl Belirlenir?
                </h3>
                <p className="text-sm text-islamic-600 dark:text-islamic-300 mt-1 leading-relaxed">
                  İslam dininde namaz vakitlerinin tarihçesi, hesaplama yöntemleri ve farklı kurumların yaklaşımları hakkında detaylı bilgi edinin.
                </p>
                <div className="flex items-center mt-3 text-gold-600 dark:text-gold-400 text-sm">
                  <span>Detayları incele</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          </a>

          <a 
            href="/modern-cihazlar-ile-namaz-vakitleri" 
            className="block p-6 bg-white/60 dark:bg-islamic-900/40 backdrop-blur-sm rounded-xl2 border border-islamic-200 dark:border-islamic-700 hover:bg-islamic-50 dark:hover:bg-islamic-900/60 transition-all duration-200 group"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-sage-500/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-sage-500/30 transition-colors">
                <span className="text-2xl text-sage-600 dark:text-sage-400">🔬</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-islamic-800 dark:text-islamic-100 group-hover:text-islamic-600 dark:group-hover:text-islamic-300 transition-colors">
                  Modern Astronomik Cihazlar ile Namaz Vakitleri
                </h3>
                <p className="text-sm text-islamic-600 dark:text-islamic-300 mt-1 leading-relaxed">
                  CCD dedektörleri, DSLR kameralar ve ASC sistemleri ile İslami ibadet vakitlerinin hassas belirlenmesi ve bilimsel gözlem yöntemleri.
                </p>
                <div className="flex items-center mt-3 text-sage-600 dark:text-sage-400 text-sm">
                  <span>Bilimsel detaylar</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </main>

      {/* Footer Banner Ad */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-center">
          <BannerAd adSlot="home-footer-banner" className="border border-islamic-200 dark:border-islamic-700 rounded-xl2 overflow-hidden" />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 border-t border-islamic-200 dark:border-islamic-700 bg-white/60 dark:bg-islamic-950/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-islamic-600 islamic-star"></div>
              <span className="text-lg font-semibold text-islamic-800 dark:text-islamic-100">
                Vakit İstanbul
              </span>
            </div>
            <p className="text-sm text-islamic-600 dark:text-islamic-400 mb-4">
              İstanbul namaz vakitleri, ezan saatleri ve İslami takvim
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <a href="/namaz-vakitleri-nasil-belirlenir" className="text-islamic-600 dark:text-islamic-400 hover:text-islamic-800 dark:hover:text-islamic-200 transition-colors">
                Namaz Vakitleri Bilgi
              </a>
              <a href="/privacy" className="text-islamic-600 dark:text-islamic-400 hover:text-islamic-800 dark:hover:text-islamic-200 transition-colors">
                Gizlilik
              </a>
              <a href="/contact" className="text-islamic-600 dark:text-islamic-400 hover:text-islamic-800 dark:hover:text-islamic-200 transition-colors">
                İletişim
              </a>
            </div>
            <div className="text-xs text-islamic-500 dark:text-islamic-500 mt-4">
              © 2024 Vakit İstanbul. Tüm hakları saklıdır.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}