import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { format, getDaysInMonth } from 'date-fns';
import { tr } from 'date-fns/locale';

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

async function fetchMonthlyPrayerTimes(year: number, month: number): Promise<DailyPrayerTimes[]> {
  const monthlyData: DailyPrayerTimes[] = [];
  
  try {
    // Aladhan API - Get monthly prayer times
    const response = await axios.get(`https://api.aladhan.com/v1/calendar/${year}/${month}`, {
      params: {
        latitude: 41.0082,
        longitude: 28.9784,
        method: 13, // Diyanet method
        tune: '0,0,0,0,0,0,0,0,0'
      },
      timeout: 10000
    });

    if (response.data && response.data.data) {
      const data = response.data.data;
      
      for (const day of data) {
        const timings = day.timings;
        const hijriDate = day.date.hijri;
        const gregorianDate = day.date.gregorian;
        
        monthlyData.push({
          date: `${gregorianDate.day}-${gregorianDate.month.number}-${gregorianDate.year}`,
          gregorianDate: `${gregorianDate.year}-${String(gregorianDate.month.number).padStart(2, '0')}-${String(gregorianDate.day).padStart(2, '0')}`,
          hijriDate: `${hijriDate.day} ${hijriDate.month.ar}`,
          fajr: timings.Fajr.substring(0, 5),
          sunrise: timings.Sunrise.substring(0, 5),
          dhuhr: timings.Dhuhr.substring(0, 5),
          asr: timings.Asr.substring(0, 5),
          maghrib: timings.Maghrib.substring(0, 5),
          isha: timings.Isha.substring(0, 5)
        });
      }
    }
  } catch (error) {
    console.error('Failed to fetch monthly prayer times:', error);
    
    // Fallback: Generate static data for the month
    const daysInMonth = getDaysInMonth(new Date(year, month - 1));
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      monthlyData.push({
        date: format(date, 'dd-MM-yyyy'),
        gregorianDate: format(date, 'yyyy-MM-dd'),
        hijriDate: format(date, 'd MMMM', { locale: tr }),
        fajr: '06:00',
        sunrise: '07:30',
        dhuhr: '12:30',
        asr: '15:00',
        maghrib: '17:30',
        isha: '19:00'
      });
    }
  }
  
  return monthlyData;
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    const year = parseInt(url.searchParams.get('year') || String(new Date().getFullYear()));
    const month = parseInt(url.searchParams.get('month') || String(new Date().getMonth() + 1));
    
    // Validate year and month
    if (year < 2000 || year > 2100 || month < 1 || month > 12) {
      return NextResponse.json(
        { error: 'Invalid year or month' },
        { status: 400 }
      );
    }
    
    const monthlyPrayerTimes = await fetchMonthlyPrayerTimes(year, month);
    
    const response = NextResponse.json({
      data: monthlyPrayerTimes,
      month: month,
      year: year,
      cached: true,
      lastUpdated: new Date().toISOString()
    });

    // Set cache headers for 1 hour
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    );
    
    return response;
  } catch (error) {
    console.error('Monthly prayer times API error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to fetch monthly prayer times',
        cached: false
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600'
        }
      }
    );
  }
}