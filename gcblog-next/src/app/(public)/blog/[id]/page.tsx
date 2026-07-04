import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MarkdownRenderer } from '@/components/blog/markdown-renderer'
import { CommentSection } from '@/components/blog/comment-section'
import { Badge } from '@/components/ui/badge'
import { Eye, Clock, Tag } from 'lucide-react'
import type { ArticleDetail } from '@/lib/types/blog'

interface BlogDetailPageProps {
  params: Promise<{ id: string }>
}

/** 获取文章详情 */
async function getArticle(id: string): Promise<ArticleDetail | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'
  try {
    const res = await fetch(`${baseUrl}/blog/articles/${id}`, {
      next: { revalidate: 60 },
    })
    if (res.ok) {
      const body = await res.json()
      return body.data || body
    }
  } catch {
    // 获取失败返回 null
  }
  return null
}

/** 动态 SEO metadata */
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const article = await getArticle(id)
  if (!article) return { title: '文章不存在' }
  return {
    title: article.title,
    description: article.title,
  }
}

/** 文章详情页（SSR，简洁浅色主题） */
export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params
  const article = await getArticle(id)

  if (!article) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-8">
      {/* 文章头部 */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-[#64748b]">
          {article.categoryName && (
            <Badge variant="secondary" className="bg-[#eff6ff] text-[#3b82f6] border-[#bfdbfe]">
              {article.categoryName}
            </Badge>
          )}
          {article.tagNames?.map((tag) => (
            <Badge key={tag} variant="outline" className="flex items-center gap-1 border-[#e2e8f0] text-[#64748b]">
              <Tag className="w-3 h-3" />
              {tag}
            </Badge>
          ))}
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.createTime?.slice(0, 10)}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            {article.viewCount} 次阅读
          </span>
        </div>
      </header>

      {/* 封面图 */}
      {article.coverImage && (
        <div className="mb-8 rounded-xl overflow-hidden border border-[#e2e8f0]">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-auto max-h-[480px] object-cover"
          />
        </div>
      )}

      {/* 文章正文 */}
      <div className="rounded-xl border border-[#e2e8f0] bg-white p-6 md:p-8 shadow-sm">
        <MarkdownRenderer content={article.content} />
      </div>

      {/* 评论区 */}
      <CommentSection articleId={article.id} />
    </article>
  )
}
