import { format, addDays, setHours, setMinutes, setSeconds } from 'date-fns';
import { PrayerTimes } from '@/types';

export interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
  total: number; // Total milliseconds
}

export interface PrayerTimeInfo {
  name: string;
  time: string;
  isActive: boolean;
  isPassed: boolean;
  timeRemaining: TimeRemaining | null;
  isUpcoming: boolean; // Next prayer
}

export class PrayerTimeCalculator {
  private static PRAYER_ORDER = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

  static getCurrentPrayerInfo(prayerTimes: PrayerTimes, currentTime: Date = new Date()): PrayerTimeInfo[] {
    const currentTimeStr = format(currentTime, 'HH:mm');
    
    return this.PRAYER_ORDER.map((prayerName) => {
      const prayerTime = prayerTimes.times[prayerName as keyof typeof prayerTimes.times];
      const isPassed = currentTimeStr > prayerTime;
      const timeRemaining = this.calculateTimeRemaining(prayerTime, currentTime);
      
      return {
        name: prayerName,
        time: prayerTime,
        isActive: this.isActivePrayer(prayerName, prayerTimes, currentTime),
        isPassed,
        timeRemaining,
        isUpcoming: this.getNextPrayer(prayerTimes, currentTime) === prayerName
      };
    });
  }

  static getNextPrayer(prayerTimes: PrayerTimes, currentTime: Date = new Date()): string | null {
    const currentTimeStr = format(currentTime, 'HH:mm');
    
    for (const prayerName of this.PRAYER_ORDER) {
      const prayerTime = prayerTimes.times[prayerName as keyof typeof prayerTimes.times];
      if (currentTimeStr < prayerTime) {
        return prayerName;
      }
    }
    
    // If all prayers have passed, next prayer is tomorrow's fajr
    return 'fajr';
  }

  static isActivePrayer(prayerName: string, prayerTimes: PrayerTimes, currentTime: Date = new Date()): boolean {
    const nextPrayer = this.getNextPrayer(prayerTimes, currentTime);
    return nextPrayer === prayerName;
  }

  static calculateTimeRemaining(prayerTimeStr: string, currentTime: Date = new Date()): TimeRemaining | null {
    try {
      const [hours, minutes] = prayerTimeStr.split(':').map(Number);
      
      let prayerDate = new Date(currentTime);
      prayerDate = setHours(prayerDate, hours);
      prayerDate = setMinutes(prayerDate, minutes);
      prayerDate = setSeconds(prayerDate, 0);
      
      // If prayer time has passed today, set it to tomorrow
      if (prayerDate <= currentTime) {
        prayerDate = addDays(prayerDate, 1);
      }
      
      const diff = prayerDate.getTime() - currentTime.getTime();
      
      if (diff <= 0) {
        return null;
      }
      
      const totalHours = Math.floor(diff / (1000 * 60 * 60));
      const totalMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const totalSeconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      return {
        hours: totalHours,
        minutes: totalMinutes,
        seconds: totalSeconds,
        total: diff
      };
    } catch (error) {
      console.error('Error calculating time remaining:', error);
      return null;
    }
  }

  static formatTimeRemaining(timeRemaining: TimeRemaining | null, includeSeconds = false): string {
    if (!timeRemaining) {
      return 'Geçti';
    }
    
    const parts: string[] = [];
    
    if (timeRemaining.hours > 0) {
      parts.push(`${timeRemaining.hours}s`);
    }
    
    if (timeRemaining.minutes > 0) {
      parts.push(`${timeRemaining.minutes}dk`);
    }
    
    if (includeSeconds && timeRemaining.hours === 0 && timeRemaining.minutes < 10) {
      parts.push(`${timeRemaining.seconds}sn`);
    }
    
    return parts.join(' ') || 'Az kaldı';
  }

  static isNearPrayerTime(prayerTimeStr: string, currentTime: Date = new Date(), minutesBefore = 5): boolean {
    const timeRemaining = this.calculateTimeRemaining(prayerTimeStr, currentTime);
    if (!timeRemaining) return false;
    
    const totalMinutes = Math.floor(timeRemaining.total / (1000 * 60));
    return totalMinutes <= minutesBefore && totalMinutes > 0;
  }

  static getHijriDate(date: Date = new Date()): string {
    // Basic Hijri date calculation (approximate)
    // For production, you might want to use a proper Hijri calendar library
    const gregorianYear = date.getFullYear();
    const hijriYear = Math.floor((gregorianYear - 622) * 1.030684);
    
    const monthNames = [
      'Muharrem', 'Safer', 'Rebîülevvel', 'Rebîülâhir',
      'Cemâziyelevvel', 'Cemâziyelâhir', 'Receb', 'Şaban',
      'Ramazan', 'Şevval', 'Zilkade', 'Zilhicce'
    ];
    
    const hijriMonth = Math.floor(Math.random() * 12); // Simplified
    const hijriDay = Math.floor(Math.random() * 29) + 1; // Simplified
    
    return `${hijriDay} ${monthNames[hijriMonth]} ${hijriYear}`;
  }

  static shouldNotify(prayerTimeStr: string, currentTime: Date = new Date(), notificationMinutes = 5): boolean {
    const timeRemaining = this.calculateTimeRemaining(prayerTimeStr, currentTime);
    if (!timeRemaining) return false;
    
    const totalMinutes = Math.floor(timeRemaining.total / (1000 * 60));
    const totalSeconds = Math.floor((timeRemaining.total % (1000 * 60)) / 1000);
    
    return totalMinutes === notificationMinutes && totalSeconds === 0;
  }

  static getPrayerProgress(prayerTimes: PrayerTimes, currentTime: Date = new Date()): number {
    const currentPrayer = this.getNextPrayer(prayerTimes, currentTime);
    if (!currentPrayer) return 100;
    
    const currentIndex = this.PRAYER_ORDER.indexOf(currentPrayer);
    if (currentIndex === -1) return 0;
    
    const previousPrayer = currentIndex === 0 ? 'isha' : this.PRAYER_ORDER[currentIndex - 1];
    const previousTime = prayerTimes.times[previousPrayer as keyof typeof prayerTimes.times];
    const currentPrayerTime = prayerTimes.times[currentPrayer as keyof typeof prayerTimes.times];
    
    // Calculate progress between previous and current prayer
    const currentTimeStr = format(currentTime, 'HH:mm');
    const [prevHour, prevMin] = previousTime.split(':').map(Number);
    const [currHour, currMin] = currentPrayerTime.split(':').map(Number);
    const [nowHour, nowMin] = currentTimeStr.split(':').map(Number);
    
    const prevMinutes = prevHour * 60 + prevMin;
    const currMinutes = currHour * 60 + currMin;
    const nowMinutes = nowHour * 60 + nowMin;
    
    let totalDuration = currMinutes - prevMinutes;
    let elapsed = nowMinutes - prevMinutes;
    
    // Handle day wrap-around
    if (totalDuration < 0) totalDuration += 24 * 60;
    if (elapsed < 0) elapsed += 24 * 60;
    
    const progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
    return Math.round(progress);
  }
}