export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  keywords: string[]
  readingTime: number
  content: string
  excerpt: string
}

export interface BlogMeta {
  title: string
  description: string
  date: string
  keywords: string[]
  author?: string
}