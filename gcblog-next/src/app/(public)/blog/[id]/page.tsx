import { notFound } from 'next/navigation'
import { MarkdownRenderer } from '@/components/blog/markdown-renderer'
import { CommentSection } from '@/components/blog/comment-section'
import { Badge } from '@/components/ui/badge'
import { Eye, Clock, Tag } from 'lucide-react'
import type { ArticleDetail } from '@/lib/types/blog'

interface BlogDetailPageProps {
  params: Promise<{ id: string }>
}

/** 文章详情页（SSR） */
export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'

  let article: ArticleDetail | null = null
  try {
    const res = await fetch(`${baseUrl}/blog/articles/${id}`, {
      next: { revalidate: 60 },
    })
    if (res.ok) {
      const body = await res.json()
      article = body.data || body
    }
    if (!article) {
      notFound()
    }
  } catch {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* 文章头部 */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-4 leading-tight">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-[#94a3b8]">
          {article.categoryName && (
            <Badge variant="secondary" className="bg-[#6366f1]/10 text-[#6366f1]">
              {article.categoryName}
            </Badge>
          )}
          {article.tagNames?.map((tag) => (
            <Badge key={tag} variant="outline" className="flex items-center gap-1">
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
        <div className="mb-8 rounded-xl overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-auto max-h-[480px] object-cover"
          />
        </div>
      )}

      {/* 文章正文 */}
      <MarkdownRenderer content={article.content} />

      {/* 评论区 */}
      <CommentSection articleId={article.id} />
    </div>
  )
}
