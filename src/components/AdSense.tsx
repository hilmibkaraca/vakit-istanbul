'use client';

import { useEffect } from 'react';

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
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-7529069132633488';
  
  if (!clientId) {
    return null;
  }

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
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
      style={{ width: '100%', height: '90px' }}
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
      style={{ display: 'block' }}
      className={`responsive-ad ${className}`}
    />
  );
}

export function LeaderboardAd({ adSlot, className = '' }: { adSlot: string; className?: string }) {
  return (
    <AdSense
      adSlot={adSlot}
      adFormat="leaderboard"
      style={{ width: '728px', height: '90px' }}
      className={`leaderboard-ad ${className}`}
    />
  );
}