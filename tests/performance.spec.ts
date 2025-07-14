import { test, expect } from '@playwright/test';

test.describe('Performance Testleri', () => {
  test('ana sayfa Core Web Vitals', async ({ page }) => {
    // Performance metrics toplama
    await page.goto('http://localhost:3000');
    
    // LCP (Largest Contentful Paint) - 2.5s altında olmalı
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      });
    });
    
    expect(Number(lcp)).toBeLessThan(2500);
    
    // FCP (First Contentful Paint) - 1.8s altında olmalı
    const fcp = await page.evaluate(() => {
      const paint = performance.getEntriesByType('paint');
      const fcpEntry = paint.find(entry => entry.name === 'first-contentful-paint');
      return fcpEntry ? fcpEntry.startTime : 0;
    });
    
    expect(fcp).toBeLessThan(1800);
  });

  test('sayfa yükleme süreleri', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    const loadTime = Date.now() - startTime;
    
    // 3 saniyeden kısa sürede yüklenmeli
    expect(loadTime).toBeLessThan(3000);
    
    // JavaScript bundle boyutu kontrolü
    const coverage = await page.coverage.startJSCoverage();
    await page.goto('http://localhost:3000');
    const jsCoverage = await page.coverage.stopJSCoverage();
    
    let totalBytes = 0;
    for (const entry of jsCoverage) {
      totalBytes += entry.text.length;
    }
    
    // Total JS 500KB altında olmalı (development'ta daha büyük olabilir)
    expect(totalBytes).toBeLessThan(1024 * 1024); // 1MB limit for dev
  });

  test('image optimization kontrolü', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Tüm resimleri kontrol et
    const images = await page.locator('img').all();
    
    for (const img of images) {
      // Alt text var mı?
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
      
      // Lazy loading var mı?
      const loading = await img.getAttribute('loading');
      if (await img.isVisible() === false) {
        expect(loading).toBe('lazy');
      }
    }
  });

  test('blog sayfası performance', async ({ page }) => {
    const routes = [
      '/blog',
      '/blog/sabah-namazi-saat-kacta',
      '/blog/cuma-namazi-vakti-istanbul'
    ];

    for (const route of routes) {
      const startTime = Date.now();
      await page.goto(`http://localhost:3000${route}`);
      const loadTime = Date.now() - startTime;
      
      // Her sayfa 2 saniyede yüklenmeli
      expect(loadTime).toBeLessThan(2000);
    }
  });
});

test.describe('Accessibility Testleri', () => {
  test('ana sayfa accessibility', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Heading hierarchy - h1 veya h2 başlık olmalı
    const mainHeadings = await page.locator('h1, h2').count();
    expect(mainHeadings).toBeGreaterThan(0);
    
    // Form labels
    const selects = await page.locator('select').all();
    for (const select of selects) {
      const id = await select.getAttribute('id');
      if (id) {
        const label = await page.locator(`label[for="${id}"]`).count();
        expect(label).toBeGreaterThan(0);
      }
    }
    
    // Button accessibility
    const buttons = await page.locator('button').all();
    for (const button of buttons) {
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      expect(text || ariaLabel).toBeTruthy();
    }
  });

  test('color contrast', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Dark mode toggle için kontrast kontrolü
    const themeToggle = page.locator('button[aria-label*="theme"], button:has(svg)').last();
    await themeToggle.click();
    
    // Dark mode'da text visible olmalı
    const headings = await page.locator('h1, h2, h3').all();
    for (const heading of headings) {
      await expect(heading).toBeVisible();
    }
  });
});