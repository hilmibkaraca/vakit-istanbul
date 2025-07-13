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

async function fetchPrayerTimes(district: string = 'ISTANBUL'): Promise<PrayerTimes> {
  const maxRetries = 3;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Primary API
      const response = await axios.get(`https://ezanvakti.herokuapp.com/vakitler`, {
        params: { sehir: district.toLowerCase() },
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
          district: data.Sehir || district
        };
      }
    } catch (error) {
      console.warn(`Prayer times API attempt ${attempt} failed:`, error);
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        continue;
      }
    }

    try {
      // Fallback API
      const fallbackResponse = await axios.get('https://api.pray.zone/v2/times/today.json', {
        params: { city: 'istanbul' },
        timeout: 5000
      });

      if (fallbackResponse.data && fallbackResponse.data.results) {
        const data = fallbackResponse.data.results.datetime[0].times;
        return {
          date: format(new Date(), 'yyyy-MM-dd'),
          hijriDate: format(new Date(), 'd MMMM yyyy', { locale: tr }),
          times: {
            fajr: data.Fajr,
            sunrise: data.Sunrise,
            dhuhr: data.Dhuhr,
            asr: data.Asr,
            maghrib: data.Maghrib,
            isha: data.Isha
          },
          district: district
        };
      }
    } catch (fallbackError) {
      console.warn(`Fallback API attempt ${attempt} failed:`, fallbackError);
    }
  }

  return STATIC_FALLBACK;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const district = searchParams.get('district') || 'ISTANBUL';
    
    const prayerTimes = await fetchPrayerTimes(district);
    
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