'use client';

import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { PrayerTimes } from '@/types';
import { PRAYER_NAMES } from '@/lib/constants';

export default function BlogSidebarWidget() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activePrayer, setActivePrayer] = useState<string | null>(null);

  const fetchPrayerTimes = useCallback(async () => {
    try {
      const response = await fetch('/api/prayer-times?district=ISTANBUL');
      const data = await response.json();
      setPrayerTimes(data.data);
    } catch (error) {
      console.error('Failed to fetch prayer times:', error);
    }
  }, []);

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
    fetchPrayerTimes();
  }, [fetchPrayerTimes]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    findActivePrayer();
  }, [findActivePrayer]);

  if (!prayerTimes) {
    return (
      <div className="bg-white/80 dark:bg-islamic-900/60 backdrop-blur-sm rounded-xl border border-islamic-200 dark:border-islamic-700 p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-islamic-200 dark:bg-islamic-700 rounded mb-4"></div>
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-3 bg-islamic-200 dark:bg-islamic-700 rounded w-16"></div>
                <div className="h-3 bg-islamic-200 dark:bg-islamic-700 rounded w-12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const mainPrayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

  return (
    <div className="bg-white/80 dark:bg-islamic-900/60 backdrop-blur-sm rounded-xl border border-islamic-200 dark:border-islamic-700 p-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-islamic-800 dark:text-islamic-100 mb-1">
          Namaz Vakitleri
        </h3>
        <p className="text-sm text-islamic-600 dark:text-islamic-400">
          {format(currentTime, 'dd MMMM yyyy', { locale: tr })}
        </p>
      </div>

      <div className="space-y-2">
        {mainPrayers.map((prayer) => {
          const time = prayerTimes.times[prayer as keyof typeof prayerTimes.times];
          const isActive = activePrayer === prayer;
          
          return (
            <div
              key={prayer}
              className={`flex justify-between items-center py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-gold-100 dark:bg-gold-900/30 text-gold-800 dark:text-gold-200'
                  : 'text-islamic-700 dark:text-islamic-300'
              }`}
            >
              <span className="text-sm font-medium">
                {PRAYER_NAMES.TR[prayer as keyof typeof PRAYER_NAMES.TR]}
              </span>
              <span className={`text-sm font-mono ${isActive ? 'font-bold' : ''}`}>
                {time}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-islamic-200 dark:border-islamic-700">
        <div className="text-center">
          <a
            href="/"
            className="text-xs text-islamic-600 dark:text-islamic-400 hover:text-islamic-800 dark:hover:text-islamic-200 transition-colors"
          >
            Tüm vakitleri gör →
          </a>
        </div>
      </div>
    </div>
  );
}