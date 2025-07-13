'use client';

import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { PrayerTimes } from '@/types';
import { ISTANBUL_DISTRICTS, PRAYER_NAMES, PRAYER_ICONS } from '@/lib/constants';

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-gray-900 dark:to-emerald-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              Vakit İstanbul
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {format(currentTime, 'dd MMMM yyyy, EEEE', { locale: tr })}
            </p>
          </div>
          
          <select
            value={selectedDistrict}
            onChange={(e) => handleDistrictChange(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
          >
            {ISTANBUL_DISTRICTS.map((district) => (
              <option key={district.id} value={district.code}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        {/* AdSense Banner */}
        <div className="flex justify-center py-2">
          <div className="w-full max-w-4xl">
            <ins
              className="adsbygoogle block"
              style={{ display: 'block' }}
              data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
              data-ad-slot="1234567890"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Current Time & Active Prayer */}
        <div className="text-center mb-8">
          <div className="text-4xl font-mono font-bold text-gray-800 dark:text-white mb-2">
            {format(currentTime, 'HH:mm:ss')}
          </div>
          {activePrayer && (
            <div className="text-lg text-emerald-600 dark:text-emerald-400">
              Sonraki vakit: {PRAYER_NAMES.TR[activePrayer as keyof typeof PRAYER_NAMES.TR]} {' '}
              ({getTimeRemaining(activePrayer)} kaldı)
            </div>
          )}
        </div>

        {/* Prayer Times Grid */}
        {prayerTimes && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {Object.entries(prayerTimes.times).map(([prayer, time]) => {
              const isActive = prayer === activePrayer;
              const timeRemaining = getTimeRemaining(prayer);
              const isPassed = timeRemaining === 'Geçti';
              
              return (
                <div
                  key={prayer}
                  className={`p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                    isActive
                      ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white transform scale-105'
                      : isPassed
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">
                      {PRAYER_ICONS[prayer as keyof typeof PRAYER_ICONS]}
                    </div>
                    <h3 className="font-semibold text-lg mb-1">
                      {PRAYER_NAMES.TR[prayer as keyof typeof PRAYER_NAMES.TR]}
                    </h3>
                    <div className="text-2xl font-mono font-bold mb-1">
                      {time}
                    </div>
                    <div className="text-sm opacity-75">
                      {timeRemaining}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* AdSense Square */}
        <div className="flex justify-center my-8">
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '336px', height: '280px' }}
            data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
            data-ad-slot="0987654321"
          ></ins>
        </div>

        {/* Hijri Date */}
        {prayerTimes && (
          <div className="text-center mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold mb-2">Hicri Tarih</h3>
              <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                {prayerTimes.hijriDate}
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* AdSense Footer Banner */}
          <div className="flex justify-center mb-6">
            <ins
              className="adsbygoogle block"
              style={{ display: 'block' }}
              data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
              data-ad-slot="1122334455"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <button className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300">
              <span>🧭</span>
              <span>Kıble Yönü</span>
            </button>
            
            <button className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300">
              <span>📅</span>
              <span>Aylık Takvim</span>
            </button>
            
            <a href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
              Gizlilik
            </a>
            
            <a href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
              İletişim
            </a>
          </div>
          
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            © 2024 Vakit İstanbul. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
}