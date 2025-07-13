// Google Analytics utility functions

interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined' || !GA_TRACKING_ID) return;

  window.gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window === 'undefined' || !GA_TRACKING_ID) return;

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
    page_title: title,
  });
};

// Track custom events
export const trackEvent = ({ action, category, label, value }: GAEvent) => {
  if (typeof window === 'undefined' || !GA_TRACKING_ID) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Specific tracking functions for prayer times app
export const trackPrayerTimeView = (district: string) => {
  trackEvent({
    action: 'view_prayer_times',
    category: 'Prayer Times',
    label: district,
  });
};

export const trackDistrictChange = (fromDistrict: string, toDistrict: string) => {
  trackEvent({
    action: 'change_district',
    category: 'User Interaction',
    label: `${fromDistrict} -> ${toDistrict}`,
  });
};

export const trackThemeToggle = (theme: string) => {
  trackEvent({
    action: 'toggle_theme',
    category: 'User Interaction',
    label: theme,
  });
};

export const trackAdImpression = (slotId: string) => {
  trackEvent({
    action: 'ad_impression',
    category: 'Advertisement',
    label: slotId,
  });
};

export const trackPWAInstall = () => {
  trackEvent({
    action: 'pwa_install',
    category: 'PWA',
    label: 'app_installed',
  });
};

export const trackNotificationPermission = (granted: boolean) => {
  trackEvent({
    action: 'notification_permission',
    category: 'PWA',
    label: granted ? 'granted' : 'denied',
  });
};

export const trackQiblaDirection = () => {
  trackEvent({
    action: 'view_qibla',
    category: 'Prayer Tools',
    label: 'qibla_direction',
  });
};

export const trackCalendarView = () => {
  trackEvent({
    action: 'view_calendar',
    category: 'Prayer Tools',
    label: 'monthly_calendar',
  });
};

export const trackAPIError = (errorType: string) => {
  trackEvent({
    action: 'api_error',
    category: 'Error',
    label: errorType,
  });
};

export const trackPerformance = (metricName: string, value: number) => {
  trackEvent({
    action: 'performance_metric',
    category: 'Performance',
    label: metricName,
    value: Math.round(value),
  });
};

// Track Core Web Vitals
export const trackWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Track when the page becomes interactive
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        // Track loading performance
        trackPerformance('dom_content_loaded', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart);
        trackPerformance('load_complete', navigation.loadEventEnd - navigation.loadEventStart);
      }
    });
  }
};

// Enhanced tracking for PWA features
export const trackPWAFeature = (feature: string, action: string, value?: number) => {
  trackEvent({
    action: `pwa_${action}`,
    category: 'PWA Features',
    label: feature,
    value,
  });
};

// Track user engagement
export const trackEngagement = (eventType: 'scroll' | 'click' | 'focus', elementName?: string) => {
  trackEvent({
    action: `user_${eventType}`,
    category: 'User Engagement',
    label: elementName,
  });
};

// Batch tracking for better performance
class AnalyticsBatch {
  private events: GAEvent[] = [];
  private batchTimeout: NodeJS.Timeout | null = null;
  private readonly maxBatchSize = 10;
  private readonly batchDelay = 1000; // 1 second

  addEvent(event: GAEvent) {
    this.events.push(event);
    
    if (this.events.length >= this.maxBatchSize) {
      this.flush();
    } else if (!this.batchTimeout) {
      this.batchTimeout = setTimeout(() => this.flush(), this.batchDelay);
    }
  }

  flush() {
    if (this.events.length === 0) return;
    
    this.events.forEach(event => trackEvent(event));
    this.events = [];
    
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
      this.batchTimeout = null;
    }
  }
}

export const analyticsBatch = new AnalyticsBatch();

// Privacy-conscious tracking
export const trackWithConsent = (event: GAEvent) => {
  // Check if user has given consent (you can implement your own consent logic)
  const hasConsent = localStorage.getItem('analytics_consent') === 'true';
  
  if (hasConsent) {
    trackEvent(event);
  }
};

// Track session information
export const trackSession = () => {
  const sessionStart = Date.now();
  const sessionId = Math.random().toString(36).substring(2);
  
  trackEvent({
    action: 'session_start',
    category: 'Session',
    label: sessionId,
  });
  
  // Track session end on page unload
  window.addEventListener('beforeunload', () => {
    const sessionDuration = Date.now() - sessionStart;
    trackEvent({
      action: 'session_end',
      category: 'Session',
      label: sessionId,
      value: Math.round(sessionDuration / 1000), // Duration in seconds
    });
  });
};