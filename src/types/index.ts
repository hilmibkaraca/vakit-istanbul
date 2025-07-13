export interface PrayerTimes {
  date: string;
  hijriDate: string;
  times: {
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  district: string;
}

export interface District {
  id: string;
  name: string;
  code: string;
}

export interface PrayerApiResponse {
  data: PrayerTimes;
  error?: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface NotificationSettings {
  enabled: boolean;
  beforeMinutes: number;
}