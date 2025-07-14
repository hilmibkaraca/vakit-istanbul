import { getPostBySlug, getAllPosts } from '@/lib/blog'
import MiniVakitWidget from '@/components/MiniVakitWidget'
import BlogSidebarWidget from '@/components/BlogSidebarWidget'
import ThemeToggle from '@/components/ThemeToggle'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { ResponsiveAd, SquareAd } from '@/components/AdSense'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  
  return {
    title: `${post.title} | Vakit`,
    description: post.description,
    keywords: post.keywords.join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `https://vakit.istanbul/blog/${post.slug}`,
      siteName: 'Vakit',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    }
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <>
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
                <Link href="/blog" className="text-islamic-600 dark:text-islamic-300 hover:text-islamic-800 dark:hover:text-islamic-100 transition-colors">
                  Rehber
                </Link>
                <ThemeToggle />
              </div>
            </nav>
          </div>
        </header>
        
        {/* Breadcrumb */}
        <div className="max-w-5xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-islamic-600 dark:text-islamic-400">
            <Link href="/" className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors">Rehber</Link>
            <span>/</span>
            <span className="text-islamic-800 dark:text-islamic-100">{post.title}</span>
          </nav>
        </div>
        
        {/* İçerik */}
        <main className="max-w-6xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Sidebar with Prayer Times */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="sticky top-24">
                <BlogSidebarWidget />
              </div>
            </aside>

            {/* Article Content */}
            <article className="lg:col-span-3 bg-white/80 dark:bg-islamic-900/60 backdrop-blur-sm rounded-xl2 border border-islamic-200 dark:border-islamic-700 p-8">
              <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4 text-islamic-800 dark:text-islamic-100">{post.title}</h1>
                <div className="flex items-center gap-4 text-islamic-600 dark:text-islamic-400">
                  <time>{new Date(post.date).toLocaleDateString('tr-TR')}</time>
                  <span>•</span>
                  <span>{post.readingTime} dakika okuma süresi</span>
                </div>
              </header>
              
              {/* Mid-Article Ad */}
              <div className="my-8 flex justify-center">
                <ResponsiveAd adSlot={`blog-mid-${post.slug.slice(0, 8)}`} className="border border-islamic-200 dark:border-islamic-700 rounded-xl2 overflow-hidden bg-white/60 dark:bg-islamic-900/40 backdrop-blur-sm" />
              </div>
              
              <div className="prose prose-lg max-w-none prose-islamic dark:prose-invert">
                <MDXRemote source={post.content} />
              </div>
              
              {/* Alt Widget */}
              <div className="mt-12 p-6 bg-gold-50 dark:bg-gold-900/20 rounded-xl2 border border-gold-200 dark:border-gold-700">
                <h3 className="text-lg font-semibold mb-4 text-islamic-800 dark:text-islamic-100">Güncel Namaz Vakitleri</h3>
                <p className="text-islamic-600 dark:text-islamic-300 mb-4">İstanbul ve tüm ilçeler için güncel namaz vakitlerine ana sayfamızdan ulaşabilirsiniz.</p>
                <Link href="/" className="inline-block bg-islamic-600 hover:bg-islamic-700 text-white px-6 py-3 rounded-xl2 transition-colors">
                  Namaz Vakitlerini Gör →
                </Link>
              </div>
            </article>

            {/* Sidebar with Square Ads */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="sticky top-24">
                <SquareAd adSlot={`blog-side1-${post.slug.slice(0, 6)}`} className="border border-islamic-200 dark:border-islamic-700 rounded-xl2 overflow-hidden bg-white/60 dark:bg-islamic-900/40 backdrop-blur-sm" />
              </div>
              
              <div className="mt-6">
                <SquareAd adSlot={`blog-side2-${post.slug.slice(0, 6)}`} className="border border-islamic-200 dark:border-islamic-700 rounded-xl2 overflow-hidden bg-white/60 dark:bg-islamic-900/40 backdrop-blur-sm" />
              </div>
            </aside>
          </div>
        </main>
      </div>
      
      <MiniVakitWidget />
    </>
  )
}