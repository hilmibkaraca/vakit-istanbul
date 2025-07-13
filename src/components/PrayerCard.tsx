'use client';

import { PRAYER_NAMES, PRAYER_ICONS } from '@/lib/constants';

interface PrayerCardProps {
  name: string;
  time: string;
  isActive: boolean;
  isPassed: boolean;
  timeRemaining: string;
}

export default function PrayerCard({
  name,
  time,
  isActive,
  isPassed,
  timeRemaining
}: PrayerCardProps) {
  return (
    <div
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
          {PRAYER_ICONS[name as keyof typeof PRAYER_ICONS]}
        </div>
        <h3 className="font-semibold text-lg mb-1">
          {PRAYER_NAMES.TR[name as keyof typeof PRAYER_NAMES.TR]}
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
}