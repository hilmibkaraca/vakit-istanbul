'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adsbygoogle: any[];
  }
}

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'banner' | 'leaderboard';
  style?: React.CSSProperties;
  className?: string;
}

export default function AdSense({ 
  adSlot, 
  adFormat = 'auto',
  style = {},
  className = ''
}: AdSenseProps) {
  const adRef = useRef<HTMLElement>(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    // Prevent duplicate loading
    if (isLoadedRef.current) return;
    
    const loadAd = () => {
      try {
        // Check if the ad element exists and has width
        if (adRef.current) {
          const rect = adRef.current.getBoundingClientRect();
          if (rect.width === 0) {
            // Retry after a short delay if width is 0
            setTimeout(loadAd, 100);
            return;
          }
        }

        // Check if adsbygoogle is available
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          window.adsbygoogle.push({});
          isLoadedRef.current = true;
        }
      } catch (err) {
        console.error('AdSense error:', err);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(loadAd, 100);
    return () => clearTimeout(timer);
  }, []);

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-7529069132633488';
  const isDevelopment = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
  
  if (!clientId) {
    return null;
  }

  // Show placeholder in development mode
  if (isDevelopment) {
    return (
      <div 
        className={`adsense-placeholder ${className}`} 
        style={{ 
          ...style,
          backgroundColor: '#f0f0f0', 
          border: '2px dashed #ccc', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          minWidth: '300px',
          minHeight: '50px',
          color: '#666',
          fontSize: '14px'
        }}
      >
        AdSense Placeholder ({adSlot})
      </div>
    );
  }

  return (
    <div className={`adsense-container ${className}`} style={{ minWidth: '300px', minHeight: '50px' }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          minWidth: '300px',
          minHeight: '50px',
          ...style
        }}
        data-ad-client={clientId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}

// Preset component variants for common ad formats
export function BannerAd({ adSlot, className = '' }: { adSlot: string; className?: string }) {
  return (
    <AdSense
      adSlot={adSlot}
      adFormat="banner"
      style={{ width: '100%', height: '90px', minWidth: '320px' }}
      className={`banner-ad ${className}`}
    />
  );
}

export function SquareAd({ adSlot, className = '' }: { adSlot: string; className?: string }) {
  return (
    <AdSense
      adSlot={adSlot}
      adFormat="rectangle"
      style={{ width: '300px', height: '250px' }}
      className={`square-ad ${className}`}
    />
  );
}

export function ResponsiveAd({ adSlot, className = '' }: { adSlot: string; className?: string }) {
  return (
    <AdSense
      adSlot={adSlot}
      adFormat="auto"
      style={{ display: 'block', minWidth: '300px', minHeight: '100px' }}
      className={`responsive-ad ${className}`}
    />
  );
}

export function LeaderboardAd({ adSlot, className = '' }: { adSlot: string; className?: string }) {
  return (
    <AdSense
      adSlot={adSlot}
      adFormat="leaderboard"
      style={{ width: '728px', height: '90px', minWidth: '320px' }}
      className={`leaderboard-ad ${className}`}
    />
  );
}