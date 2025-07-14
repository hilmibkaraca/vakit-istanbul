import { test, expect } from '@playwright/test';

test.describe('Ana Sayfa Testleri', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('sayfa başarıyla yükleniyor', async ({ page }) => {
    // Title kontrolü
    await expect(page).toHaveTitle(/Vakit İstanbul/);
    
    // Logo görünüyor mu?
    const logo = page.locator('h1:has-text("Vakit İstanbul")');
    await expect(logo).toBeVisible();
  });

  test('namaz vakitleri widget\'ı çalışıyor', async ({ page }) => {
    // Canlı saat görünüyor mu?
    const clock = page.locator('[class*="text-6xl"][class*="font-mono"]');
    await expect(clock).toBeVisible();
    
    // Namaz vakitleri kartları
    const prayerCards = page.locator('[class*="prayer-glow"], [class*="rounded-xl2"]').filter({ has: page.locator('[class*="text-3xl"]') });
    const cardCount = await prayerCards.count();
    expect(cardCount).toBeGreaterThanOrEqual(5); // En az 5 namaz vakti
    
    // İlçe seçici dropdown (button based)
    const districtSelector = page.locator('button:has-text("İstanbul"), button:has-text("Adalar"), button:has-text("Fatih")').first();
    await expect(districtSelector).toBeVisible();
  });

  test('blog bölümü görünüyor', async ({ page }) => {
    // Blog başlığı
    const blogTitle = page.locator('h2:has-text("Namaz ve İbadet Rehberimiz")');
    await expect(blogTitle).toBeVisible();
    
    // 6 blog kartı
    const blogCards = page.locator('a[href^="/blog/"]').filter({ hasText: /Namaz|İftar|Cuma/ });
    await expect(blogCards.first()).toBeVisible();
    
    // Tüm blog yazılarını görüntüle butonu
    const allBlogsButton = page.locator('a:has-text("Tüm Blog Yazılarını Görüntüle")');
    await expect(allBlogsButton).toBeVisible();
  });

  test('tema değiştirici çalışıyor', async ({ page }) => {
    // Theme toggle butonu - daha genel selector
    const themeToggle = page.locator('button[title*="tema"], button[aria-label*="tema"], button:has(svg):last-of-type');
    await expect(themeToggle.first()).toBeVisible();
    
    // Butonun tıklanabilir olduğunu test et
    await themeToggle.first().click();
    await page.waitForTimeout(500);
    
    // En azından localStorage'da theme key'i oluştu mu?
    const hasTheme = await page.evaluate(() => {
      return localStorage.getItem('theme') !== null;
    });
    
    expect(hasTheme).toBeTruthy();
  });

  test('sayfa temel elementleri mevcut', async ({ page }) => {
    // Sayfa header ve footer elementleri var mı?
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Navigation menu var mı?
    const nav = page.locator('nav, a[href="/"], a[href="/blog"]');
    const navCount = await nav.count();
    expect(navCount).toBeGreaterThan(0);
  });
});

test.describe('Responsive Design Testleri', () => {
  test('mobile görünüm (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');
    
    // Blog grid tek sütun olmalı
    const blogGrid = page.locator('[class*="grid-cols-1"]');
    await expect(blogGrid.first()).toBeVisible();
  });

  test('tablet görünüm (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('http://localhost:3000');
    
    // Blog grid 2 sütun olmalı (md:grid-cols-2)
    const blogGrid = page.locator('[class*="md:grid-cols-2"]');
    await expect(blogGrid.first()).toBeVisible();
  });

  test('desktop görünüm (1200px)', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('http://localhost:3000');
    
    // Blog grid 3 sütun olmalı (lg:grid-cols-3)
    const blogGrid = page.locator('[class*="lg:grid-cols-3"]');
    await expect(blogGrid.first()).toBeVisible();
  });
});