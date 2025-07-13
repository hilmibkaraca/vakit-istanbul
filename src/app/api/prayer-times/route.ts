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
      // Diyanet İşleri Başkanlığı resmi API
      const today = format(new Date(), 'yyyy-MM-dd');
      const response = await axios.get(`https://api.diyanet.gov.tr/PrayerTime/PrayerTimesDaily`, {
        params: {
          districtId: getDistrictId(district),
          date: today
        },
        timeout: 8000,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'VakitIstanbul/1.0'
        }
      });

      if (response.data && response.data.length > 0) {
        const data = response.data[0];
        return {
          date: today,
          hijriDate: data.HijriDate || format(new Date(), 'd MMMM yyyy', { locale: tr }),
          times: {
            fajr: data.Fajr,
            sunrise: data.Sunrise,
            dhuhr: data.Dhuhr,
            asr: data.Asr,
            maghrib: data.Maghrib,
            isha: data.Isha
          },
          district: data.District || district
        };
      }
    } catch (error) {
      console.warn(`Diyanet API attempt ${attempt} failed:`, error);
    }

    try {
      // Ezanvakti.herokuapp.com fallback
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
      console.warn(`Ezanvakti API attempt ${attempt} failed:`, error);
    }

    if (attempt < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }

  return STATIC_FALLBACK;
}

function getDistrictId(district: string): string {
  const districtIds: { [key: string]: string } = {
    'ISTANBUL': '9541',
    'ADALAR': '9478',
    'ARNAVUTKOY': '9479',
    'ATASEHIR': '9480',
    'AVCILAR': '9481',
    'BAGCILAR': '9482',
    'BAHCELIEVLER': '9483',
    'BAKIRKOY': '9484',
    'BASAKSEHIR': '9485',
    'BAYRAMPASA': '9486',
    'BESIKTAS': '9487',
    'BEYKOZ': '9488',
    'BEYLIKDUZU': '9489',
    'BEYOGLU': '9490',
    'BUYUKCEKMECE': '9491',
    'CATALCA': '9492',
    'CEKMECE': '9493',
    'ESENLER': '9494',
    'ESENYURT': '9495',
    'EYUPSULTAN': '9496',
    'FATIH': '9497',
    'GAZIOSMANPASA': '9498',
    'GUNGOREN': '9499',
    'KADIKOY': '9500',
    'KAGITHANE': '9501',
    'KARTAL': '9502',
    'KUCUKCEKMECE': '9503',
    'MALTEPE': '9504',
    'PENDIK': '9505',
    'SANCAKTEPE': '9506',
    'SARIYER': '9507',
    'SILIVRI': '9508',
    'SISLI': '9509',
    'SULTANGAZI': '9510',
    'SULTANBEYLI': '9511',
    'TUZLA': '9512',
    'UMRANIYE': '9513',
    'USKUDAR': '9514',
    'ZEYTINBURNU': '9515'
  };
  
  return districtIds[district.toUpperCase()] || '9541'; // Default to Istanbul
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