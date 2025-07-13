'use client';

import { useState, useEffect } from 'react';

interface TimeCountdownProps {
  targetTime: string;
  prayerName: string;
  onNotification?: () => void;
}

export default function TimeCountdown({
  targetTime,
  prayerName,
  onNotification
}: TimeCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const [hasNotified, setHasNotified] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const [hours, minutes] = targetTime.split(':').map(Number);
      
      const target = new Date();
      target.setHours(hours, minutes, 0, 0);
      
      if (target < now) {
        target.setDate(target.getDate() + 1);
      }
      
      const diff = target.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }
      
      const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
      const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft({
        hours: hoursLeft,
        minutes: minutesLeft,
        seconds: secondsLeft
      });
      
      // Notify 5 minutes before
      if (hoursLeft === 0 && minutesLeft === 5 && secondsLeft === 0 && !hasNotified) {
        onNotification?.();
        setHasNotified(true);
      }
      
      // Reset notification flag when prayer time changes
      if (hoursLeft > 0 || minutesLeft > 5) {
        setHasNotified(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime, prayerName, onNotification, hasNotified]);

  if (!timeLeft) {
    return (
      <div className="text-center p-4">
        <span className="text-gray-500">Vakit geçti</span>
      </div>
    );
  }

  const formatTime = () => {
    const parts = [];
    
    if (timeLeft.hours > 0) {
      parts.push(`${timeLeft.hours} saat`);
    }
    
    if (timeLeft.minutes > 0) {
      parts.push(`${timeLeft.minutes} dakika`);
    }
    
    if (timeLeft.hours === 0 && timeLeft.minutes < 10) {
      parts.push(`${timeLeft.seconds} saniye`);
    }
    
    return parts.join(' ');
  };

  const isUrgent = timeLeft.hours === 0 && timeLeft.minutes <= 5;

  return (
    <div className={`text-center p-4 rounded-lg ${
      isUrgent 
        ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200' 
        : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200'
    }`}>
      <div className="text-sm font-medium mb-1">
        {prayerName} vaktine kalan süre:
      </div>
      <div className={`font-mono text-lg font-bold ${
        isUrgent ? 'animate-pulse' : ''
      }`}>
        {formatTime()}
      </div>
      {isUrgent && (
        <div className="text-xs mt-1 opacity-75">
          Vakit yaklaşıyor!
        </div>
      )}
    </div>
  );
}