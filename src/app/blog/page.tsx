import { getAllPosts } from '@/lib/blog'
import BlogCard from '@/components/BlogCard'
import BlogSidebarWidget from '@/components/BlogSidebarWidget'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

export const metadata = {
  title: 'Namaz Rehberi ve Bilgi Yazıları - Vakit',
  description: 'Namaz vakitleri, ibadet rehberleri ve dini bilgiler hakkında faydalı yazılar. İstanbul namaz vakitleri ve İslami bilgiler.',
  keywords: 'namaz rehberi, namaz vakitleri, dini bilgiler, İslami rehber, namaz kılma, ibadet rehberi',
}

export default function BlogPage() {
  const posts = getAllPosts()
  
  return (
    <div className="min-h-screen islamic-pattern">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-islamic-950/90 backdrop-blur-md border-b border-islamic-200 dark:border-islamic-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-islamic-gradient rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-islamic-600 islamic-star"></div>
              </div>
              <span className="text-2xl font-bold text-islamic-800 dark:text-islamic-100 group-hover:text-islamic-600 dark:group-hover:text-islamic-300 transition-colors">
                Vakit
              </span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-islamic-600 dark:text-islamic-300 hover:text-islamic-800 dark:hover:text-islamic-100 transition-colors">
                Namaz Vakitleri
              </Link>
              <Link href="/blog" className="text-gold-600 dark:text-gold-400 font-medium">
                Rehber
              </Link>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>
      
      {/* İçerik */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-islamic-800 dark:text-islamic-100 mb-4">Namaz Rehberi</h1>
          <p className="text-lg text-islamic-600 dark:text-islamic-300 max-w-2xl mx-auto">
            Namaz vakitleri, ibadet rehberleri ve dini konular hakkında faydalı bilgiler
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with Prayer Times */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <BlogSidebarWidget />
            </div>
          </aside>
          
          {/* Blog Posts Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </div>
        
        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-islamic-600 dark:text-islamic-300">
              Henüz blog yazısı bulunmuyor. Yakında faydalı içerikler paylaşılacak.
            </p>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="mt-16 border-t border-islamic-200 dark:border-islamic-700 bg-white/60 dark:bg-islamic-950/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center space-x-2 mb-4 hover:text-islamic-600 dark:hover:text-islamic-300 transition-colors">
              <div className="w-6 h-6 bg-islamic-600 islamic-star"></div>
              <span className="text-lg font-semibold text-islamic-800 dark:text-islamic-100">
                Vakit
              </span>
            </Link>
            <p className="text-sm text-islamic-600 dark:text-islamic-400">
              © 2025 Vakit. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}