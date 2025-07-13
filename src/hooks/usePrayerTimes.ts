'use client';

import { useState, useEffect, useCallback } from 'react';
import { PrayerTimes, PrayerApiResponse } from '@/types';

interface UsePrayerTimesOptions {
  district?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

interface UsePrayerTimesReturn {
  prayerTimes: PrayerTimes | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  lastUpdated: Date | null;
}

export function usePrayerTimes({
  district = 'ISTANBUL',
  autoRefresh = true,
  refreshInterval = 3600000 // 1 hour
}: UsePrayerTimesOptions = {}): UsePrayerTimesReturn {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchPrayerTimes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`/api/prayer-times?district=${district}`, {
        signal: controller.signal,
        cache: 'default'
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PrayerApiResponse = await response.json();

      if (data.error) {
        console.warn('API returned with warning:', data.error);
      }

      setPrayerTimes(data.data);
      setLastUpdated(new Date());
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('İstek zaman aşımına uğradı');
        } else {
          setError(err.message || 'Namaz vakitleri alınırken hata oluştu');
        }
      } else {
        setError('Bilinmeyen bir hata oluştu');
      }
      console.error('Prayer times fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [district]);

  const refetch = useCallback(async () => {
    await fetchPrayerTimes();
  }, [fetchPrayerTimes]);

  // Initial fetch and district change handler
  useEffect(() => {
    fetchPrayerTimes();
  }, [fetchPrayerTimes]);

  // Auto refresh interval
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchPrayerTimes();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchPrayerTimes]);

  // Refetch when page becomes visible (for better user experience)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && lastUpdated) {
        const timeSinceLastUpdate = Date.now() - lastUpdated.getTime();
        // Refetch if it's been more than 5 minutes since last update
        if (timeSinceLastUpdate > 300000) {
          fetchPrayerTimes();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [lastUpdated, fetchPrayerTimes]);

  return {
    prayerTimes,
    loading,
    error,
    refetch,
    lastUpdated
  };
}