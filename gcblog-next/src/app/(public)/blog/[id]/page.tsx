import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MarkdownRenderer } from '@/components/blog/markdown-renderer'
import { CommentSection } from '@/components/blog/comment-section'
import { Badge } from '@/components/ui/badge'
import { BlurFade } from '@/components/ui/blur-fade'
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

/** 文章详情页（SSR，深色主题） */
export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params
  const article = await getArticle(id)

  if (!article) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-8">
      {/* 文章头部 */}
      <BlurFade delay={0.1}>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[#64748b]">
            {article.categoryName && (
              <Badge variant="secondary" className="bg-[#3b82f6]/10 text-[#60a5fa] border-[#3b82f6]/20">
                {article.categoryName}
              </Badge>
            )}
            {article.tagNames?.map((tag) => (
              <Badge key={tag} variant="outline" className="flex items-center gap-1 border-white/10 text-[#94a3b8]">
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
      </BlurFade>

      {/* 封面图 */}
      {article.coverImage && (
        <BlurFade delay={0.2}>
          <div className="mb-8 rounded-xl overflow-hidden border border-white/8">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-auto max-h-[480px] object-cover"
            />
          </div>
        </BlurFade>
      )}

      {/* 文章正文 */}
      <BlurFade delay={0.3}>
        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-6 md:p-8">
          <MarkdownRenderer content={article.content} />
        </div>
      </BlurFade>

      {/* 评论区 */}
      <BlurFade delay={0.4} inView>
        <CommentSection articleId={article.id} />
      </BlurFade>
    </article>
  )
}
