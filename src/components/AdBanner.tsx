'use client';

import { useEffect, useState } from 'react';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

export default function AdBanner({
  slot,
  format = 'auto',
  responsive = true,
  width,
  height,
  className = ''
}: AdBannerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line prefer-const
    let timeoutId: NodeJS.Timeout;

    const checkAdBlock = () => {
      try {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          window.adsbygoogle.push({});
          setIsLoaded(true);
        }
      } catch (error) {
        console.warn('AdSense failed to load:', error);
        setIsBlocked(true);
      }
    };

    // Delay to ensure script is loaded
    // eslint-disable-next-line prefer-const
    timeoutId = setTimeout(checkAdBlock, 1000);

    // Fallback check for ad blockers
    const fallbackTimeoutId = setTimeout(() => {
      if (!isLoaded) {
        setIsBlocked(true);
      }
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(fallbackTimeoutId);
    };
  }, [isLoaded]);

  if (isBlocked) {
    return (
      <div className={`bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center ${className}`}>
        <div className="text-gray-500 dark:text-gray-400 text-sm">
          <div className="mb-2">📢</div>
          <div>Reklam alanı</div>
          <div className="text-xs mt-1">
            Siteyi desteklemek için reklam engelleyicinizi kapatabilirsiniz.
          </div>
        </div>
      </div>
    );
  }

  const style: React.CSSProperties = {
    display: 'block',
    ...(width && height && { width: `${width}px`, height: `${height}px` })
  };

  return (
    <div className={`min-h-[100px] flex items-center justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
      
      {!isLoaded && !isBlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Reklam yükleniyor...</div>
          </div>
        </div>
      )}
    </div>
  );
}

// Extend window type for TypeScript
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}