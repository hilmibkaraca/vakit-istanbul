import Link from 'next/link'
import { BlogPost } from '@/types/blog'

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="bg-white/80 dark:bg-islamic-900/60 backdrop-blur-sm rounded-xl2 border border-islamic-200 dark:border-islamic-700 hover:bg-islamic-50 dark:hover:bg-islamic-900/70 transition-all duration-200 p-6">
      <div className="flex items-center gap-2 text-sm text-islamic-500 dark:text-islamic-400 mb-3">
        <time>{new Date(post.date).toLocaleDateString('tr-TR')}</time>
        <span>•</span>
        <span>{post.readingTime} dk okuma</span>
      </div>
      <h2 className="text-xl font-bold mb-3 line-clamp-2 text-islamic-800 dark:text-islamic-100">
        <Link href={`/blog/${post.slug}`} className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
          {post.title}
        </Link>
      </h2>
      <p className="text-islamic-600 dark:text-islamic-300 line-clamp-3 mb-4">{post.description}</p>
      <Link 
        href={`/blog/${post.slug}`} 
        className="text-gold-600 dark:text-gold-400 font-medium hover:text-gold-700 dark:hover:text-gold-300 inline-flex items-center gap-1 transition-colors"
      >
        Devamını Oku
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </article>
  )
}