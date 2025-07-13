'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import ThemeToggle from '@/components/ThemeToggle';
import DistrictSelector from '@/components/DistrictSelector';
import Link from 'next/link';

interface DailyPrayerTimes {
  date: string;
  gregorianDate: string;
  hijriDate: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export default function ImsakiyePage() {
  const [selectedDistrict, setSelectedDistrict] = useState('ISTANBUL');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [prayerTimes, setPrayerTimes] = useState<DailyPrayerTimes[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMonthlyPrayerTimes = async () => {
    try {
      setLoading(true);
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth() + 1;
      
      const response = await fetch(`/api/prayer-times/monthly?district=${selectedDistrict}&year=${year}&month=${month}`);
      const data = await response.json();
      
      if (data.data) {
        setPrayerTimes(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch monthly prayer times:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('selectedDistrict');
    if (saved) {
      setSelectedDistrict(saved);
    }
  }, []);

  useEffect(() => {
    fetchMonthlyPrayerTimes();
  }, [selectedDistrict, currentMonth]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    localStorage.setItem('selectedDistrict', district);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  return (
    <div className="min-h-screen islamic-pattern">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-islamic-950/90 backdrop-blur-md border-b border-islamic-200 dark:border-islamic-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
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
                    İmsakiye
                  </p>
                </div>
              </Link>
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

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-3 rounded-full bg-white/60 dark:bg-islamic-900/40 backdrop-blur-sm border border-islamic-200 dark:border-islamic-700 hover:bg-islamic-50 dark:hover:bg-islamic-900/60 transition-all duration-200"
            aria-label="Önceki ay"
          >
            <span className="text-xl">←</span>
          </button>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-islamic-800 dark:text-islamic-100">
              {format(currentMonth, 'MMMM yyyy', { locale: tr })}
            </h2>
            <p className="text-sm text-islamic-600 dark:text-islamic-300 mt-1">
              {selectedDistrict} İmsakiyesi
            </p>
          </div>

          <button
            onClick={() => navigateMonth('next')}
            className="p-3 rounded-full bg-white/60 dark:bg-islamic-900/40 backdrop-blur-sm border border-islamic-200 dark:border-islamic-700 hover:bg-islamic-50 dark:hover:bg-islamic-900/60 transition-all duration-200"
            aria-label="Sonraki ay"
          >
            <span className="text-xl">→</span>
          </button>
        </div>

        {/* Prayer Times Table */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-islamic-300 border-t-islamic-600 rounded-full animate-spin"></div>
            <p className="text-islamic-700 dark:text-islamic-300 font-medium">İmsakiye yükleniyor...</p>
          </div>
        ) : (
          <div className="bg-white/80 dark:bg-islamic-900/60 backdrop-blur-sm rounded-2xl2 border border-islamic-200 dark:border-islamic-700 overflow-hidden shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-islamic-100 dark:bg-islamic-800/50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-islamic-800 dark:text-islamic-100">
                      Tarih
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-islamic-800 dark:text-islamic-100">
                      İmsak
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-islamic-800 dark:text-islamic-100">
                      Güneş
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-islamic-800 dark:text-islamic-100">
                      Öğle
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-islamic-800 dark:text-islamic-100">
                      İkindi
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-islamic-800 dark:text-islamic-100">
                      Akşam
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-islamic-800 dark:text-islamic-100">
                      Yatsı
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {prayerTimes.map((day, index) => {
                    const isToday = day.gregorianDate === format(new Date(), 'yyyy-MM-dd');
                    const isWeekend = new Date(day.gregorianDate).getDay() === 0 || new Date(day.gregorianDate).getDay() === 5;
                    
                    return (
                      <tr 
                        key={day.date} 
                        className={`border-t border-islamic-100 dark:border-islamic-800/30 ${
                          isToday ? 'bg-gold-50 dark:bg-gold-900/20' : 
                          index % 2 === 0 ? 'bg-white/50 dark:bg-islamic-900/30' : ''
                        } hover:bg-islamic-50 dark:hover:bg-islamic-800/30 transition-colors`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className={`font-medium ${
                              isToday ? 'text-gold-700 dark:text-gold-300' : 
                              isWeekend ? 'text-islamic-600 dark:text-islamic-400' : 
                              'text-islamic-700 dark:text-islamic-300'
                            }`}>
                              {format(new Date(day.gregorianDate), 'd EEEE', { locale: tr })}
                            </span>
                            <span className="text-xs text-islamic-500 dark:text-islamic-400 arabic-text">
                              {day.hijriDate}
                            </span>
                          </div>
                        </td>
                        <td className={`px-4 py-3 text-center font-mono ${
                          isToday ? 'text-gold-700 dark:text-gold-300 font-semibold' : 
                          'text-islamic-700 dark:text-islamic-300'
                        }`}>
                          {day.fajr}
                        </td>
                        <td className={`px-4 py-3 text-center font-mono ${
                          isToday ? 'text-gold-700 dark:text-gold-300 font-semibold' : 
                          'text-islamic-700 dark:text-islamic-300'
                        }`}>
                          {day.sunrise}
                        </td>
                        <td className={`px-4 py-3 text-center font-mono ${
                          isToday ? 'text-gold-700 dark:text-gold-300 font-semibold' : 
                          'text-islamic-700 dark:text-islamic-300'
                        }`}>
                          {day.dhuhr}
                        </td>
                        <td className={`px-4 py-3 text-center font-mono ${
                          isToday ? 'text-gold-700 dark:text-gold-300 font-semibold' : 
                          'text-islamic-700 dark:text-islamic-300'
                        }`}>
                          {day.asr}
                        </td>
                        <td className={`px-4 py-3 text-center font-mono ${
                          isToday ? 'text-gold-700 dark:text-gold-300 font-semibold' : 
                          'text-islamic-700 dark:text-islamic-300'
                        }`}>
                          {day.maghrib}
                        </td>
                        <td className={`px-4 py-3 text-center font-mono ${
                          isToday ? 'text-gold-700 dark:text-gold-300 font-semibold' : 
                          'text-islamic-700 dark:text-islamic-300'
                        }`}>
                          {day.isha}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 p-6 bg-white/60 dark:bg-islamic-900/40 backdrop-blur-sm rounded-xl2 border border-islamic-200 dark:border-islamic-700">
          <h3 className="text-lg font-semibold text-islamic-800 dark:text-islamic-100 mb-3">
            Bilgilendirme
          </h3>
          <ul className="space-y-2 text-sm text-islamic-600 dark:text-islamic-300">
            <li>• İmsak vakti, sabah namazının başlangıç vaktini gösterir.</li>
            <li>• Güneş doğuş vakti, sabah namazının bitiş vaktini gösterir.</li>
            <li>• Vakitler Diyanet İşleri Başkanlığı hesaplama metoduna göre verilmiştir.</li>
            <li>• Hicri tarihler tahmini olup, hilal görülmesine göre değişebilir.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}