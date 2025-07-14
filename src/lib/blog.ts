import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { BlogPost } from '@/types/blog'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const readTime = readingTime(content)
      
      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        keywords: data.keywords || [],
        readingTime: Math.ceil(readTime.minutes),
        content,
        excerpt: data.description || content.substring(0, 160) + '...'
      }
    })
  
  return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const readTime = readingTime(content)
    
    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      keywords: data.keywords || [],
      readingTime: Math.ceil(readTime.minutes),
      content,
      excerpt: data.description || content.substring(0, 160) + '...'
    }
  } catch {
    return null
  }
}