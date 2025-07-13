import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { PrayerTimes } from '@/types';

const CACHE_DURATION = 3600; // 1 hour
const STATIC_FALLBACK: PrayerTimes = {
  date: format(new Date(), 'yyyy-MM-dd'),
  hijriDate: format(new Date(), 'd MMMM yyyy', { locale: tr }),
  times: {
    fajr: '06:00',
    sunrise: '07:30',
    dhuhr: '12:30',
    asr: '15:00',
    maghrib: '17:30',
    isha: '19:00'
  },
  district: 'İstanbul'
};

async function fetchPrayerTimes(): Promise<PrayerTimes> {
  const maxRetries = 3;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // API 1: Aladhan API - İslamic calculation with Diyanet method
      const lat = 41.0082;
      const lng = 28.9784;
      const today = Math.floor(Date.now() / 1000);
      
      const response = await axios.get(`https://api.aladhan.com/v1/timings/${today}`, {
        params: {
          latitude: lat,
          longitude: lng,
          method: 13, // Diyanet method
          tune: '0,0,0,0,0,0,0,0,0' // No adjustments
        },
        timeout: 8000
      });

      if (response.data && response.data.data && response.data.data.timings) {
        const timings = response.data.data.timings;
        const hijriDate = response.data.data.date.hijri;
        
        return {
          date: format(new Date(), 'yyyy-MM-dd'),
          hijriDate: `${hijriDate.day} ${hijriDate.month.ar} ${hijriDate.year}`,
          times: {
            fajr: timings.Fajr,
            sunrise: timings.Sunrise,
            dhuhr: timings.Dhuhr,
            asr: timings.Asr,
            maghrib: timings.Maghrib,
            isha: timings.Isha
          },
          district: 'İstanbul'
        };
      }
    } catch (error) {
      console.warn(`Aladhan API attempt ${attempt} failed:`, error);
    }

    try {
      // API 2: Prayer Times with city name (alternative endpoint)
      const response = await axios.get('https://api.aladhan.com/v1/timingsByCity', {
        params: {
          city: 'Istanbul',
          country: 'Turkey',
          method: 13, // Diyanet method
          tune: '0,0,0,0,0,0,0,0,0'
        },
        timeout: 5000
      });

      if (response.data && response.data.data && response.data.data.timings) {
        const timings = response.data.data.timings;
        const hijriDate = response.data.data.date.hijri;
        
        return {
          date: format(new Date(), 'yyyy-MM-dd'),
          hijriDate: `${hijriDate.day} ${hijriDate.month.ar} ${hijriDate.year}`,
          times: {
            fajr: timings.Fajr,
            sunrise: timings.Sunrise,
            dhuhr: timings.Dhuhr,
            asr: timings.Asr,
            maghrib: timings.Maghrib,
            isha: timings.Isha
          },
          district: 'İstanbul'
        };
      }
    } catch (error) {
      console.warn(`Aladhan City API attempt ${attempt} failed:`, error);
    }

    try {
      // API 3: Ezanvakti fallback
      const response = await axios.get(`https://ezanvakti.herokuapp.com/vakitler`, {
        params: { sehir: 'istanbul' },
        timeout: 5000
      });

      if (response.data && response.data.length > 0) {
        const data = response.data[0];
        return {
          date: format(new Date(), 'yyyy-MM-dd'),
          hijriDate: data.HicriTarih || format(new Date(), 'd MMMM yyyy', { locale: tr }),
          times: {
            fajr: data.Imsak || data.Sabah,
            sunrise: data.Gunes,
            dhuhr: data.Ogle,
            asr: data.Ikindi,
            maghrib: data.Aksam,
            isha: data.Yatsi
          },
          district: data.Sehir || 'İstanbul'
        };
      }
    } catch (error) {
      console.warn(`Ezanvakti API attempt ${attempt} failed:`, error);
    }

    if (attempt < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }

  return STATIC_FALLBACK;
}


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const district = searchParams.get('district') || 'ISTANBUL';
    
    // For now, we'll use Istanbul coordinates regardless of district
    // In future, we can add district-specific coordinates
    const prayerTimes = await fetchPrayerTimes();
    
    const response = NextResponse.json({
      data: prayerTimes,
      cached: true,
      lastUpdated: new Date().toISOString()
    });

    // Set cache headers
    response.headers.set(
      'Cache-Control',
      `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=86400`
    );
    
    return response;
  } catch (error) {
    console.error('Prayer times API error:', error);
    
    return NextResponse.json(
      {
        data: STATIC_FALLBACK,
        error: 'Failed to fetch prayer times, using fallback data',
        cached: false
      },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600'
        }
      }
    );
  }
}