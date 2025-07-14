import { test, expect } from '@playwright/test';

test.describe('Blog Sistemi Testleri', () => {
  test('blog liste sayfası yükleniyor', async ({ page }) => {
    await page.goto('http://localhost:3000/blog');
    
    // Sayfa başlığı
    await expect(page).toHaveTitle(/Namaz Rehberi.*Vakit İstanbul/);
    
    // Blog başlığı
    const pageTitle = page.locator('h1:has-text("Namaz ve İbadet Rehberi")');
    await expect(pageTitle).toBeVisible();
    
    // Blog kartları
    const blogCards = page.locator('[class*="blog-card"]');
    const count = await blogCards.count();
    expect(count).toBeGreaterThan(5); // En az 6 blog yazısı olmalı
  });

  test('blog detay sayfaları yükleniyor', async ({ page }) => {
    const blogSlugs = [
      'sabah-namazi-saat-kacta',
      'cuma-namazi-vakti-istanbul',
      'namaz-vakti-gecince-ne-yapilir',
      'iftar-vakti-hesaplama-2025',
      'iste-namaz-kilmak-icin-izin-hakkiniz'
    ];

    for (const slug of blogSlugs) {
      await page.goto(`http://localhost:3000/blog/${slug}`);
      
      // Sayfa yükleniyor mu?
      await expect(page.locator('article')).toBeVisible();
      
      // Başlık var mı?
      await expect(page.locator('h1')).toBeVisible();
      
      // İçerik render olmuş mu?
      const content = page.locator('.prose');
      await expect(content).toBeVisible();
      
      // Breadcrumb navigation
      const breadcrumb = page.locator('nav:has-text("Ana Sayfa")');
      await expect(breadcrumb).toBeVisible();
    }
  });

  test('blog içeriği düzgün render oluyor', async ({ page }) => {
    await page.goto('http://localhost:3000/blog/sabah-namazi-saat-kacta');
    
    // MDX içerik kontrolü
    const content = page.locator('.prose');
    await expect(content).toBeVisible();
    
    // Başlıklar (H2, H3)
    const h2Headers = page.locator('.prose h2');
    const h2Count = await h2Headers.count();
    expect(h2Count).toBeGreaterThan(2);
    
    // Paragraflar
    const paragraphs = page.locator('.prose p');
    const pCount = await paragraphs.count();
    expect(pCount).toBeGreaterThan(5);
    
    // Reading time
    const readingTime = page.locator('text=/\\d+ dakika okuma süresi/');
    await expect(readingTime).toBeVisible();
  });

  test('blog sidebar ve reklamlar', async ({ page }) => {
    await page.goto('http://localhost:3000/blog/cuma-namazi-vakti-istanbul');
    
    // Desktop görünümde sidebar
    await page.setViewportSize({ width: 1200, height: 800 });
    
    // Sidebar var mı?
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeVisible();
    
    // AdSense placeholder'ları (dev mode)
    const adPlaceholders = sidebar.locator('.adsense-placeholder');
    const adCount = await adPlaceholders.count();
    expect(adCount).toBe(2); // 2 square ad olmalı
  });

  test('blog navigasyon linkleri çalışıyor', async ({ page }) => {
    await page.goto('http://localhost:3000/blog/namaz-vakti-gecince-ne-yapilir');
    
    // Ana sayfaya dön
    await page.click('a:has-text("Vakit İstanbul")');
    await expect(page).toHaveURL('http://localhost:3000/');
    
    // Blog listesine dön
    await page.goto('http://localhost:3000/blog/namaz-vakti-gecince-ne-yapilir');
    await page.click('a:has-text("Rehber")');
    await expect(page).toHaveURL('http://localhost:3000/blog');
  });
});

test.describe('SEO ve Metadata Testleri', () => {
  test('ana sayfa SEO', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Meta tags
    const description = await page.getAttribute('meta[name="description"]', 'content');
    expect(description).toContain('İstanbul namaz vakitleri');
    
    const keywords = await page.getAttribute('meta[name="keywords"]', 'content');
    expect(keywords).toContain('namaz vakitleri');
  });

  test('blog sayfası SEO', async ({ page }) => {
    await page.goto('http://localhost:3000/blog/sabah-namazi-saat-kacta');
    
    // Title
    const title = await page.title();
    expect(title).toContain('Sabah Namazı');
    expect(title).toContain('Vakit İstanbul');
    
    // Meta description
    const description = await page.getAttribute('meta[name="description"]', 'content');
    expect(description).toContain('sabah namazı');
    
    // OpenGraph tags
    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
    expect(ogTitle).toBeTruthy();
  });
});