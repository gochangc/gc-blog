'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Eye, Clock } from 'lucide-react'
import { AnimatedStagger } from '@/components/animation/animated-stagger'
import type { Article } from '@/lib/types/blog'

interface ArticleListProps {
  articles: Article[]
}

/** 中间文章列表（经典列表式布局，标题 + 摘要 + 元信息，带交错入场动画） */
export function ArticleList({ articles }: ArticleListProps) {
  if (!articles.length) {
    return (
      <div className="text-center py-20">
        <p className="text-[#64748b] text-sm">暂无文章</p>
      </div>
    )
  }

  return (
    <AnimatedStagger itemSelector=".article-item" stagger={0.08}>
      <div className="space-y-1">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/blog/${article.id}`}
            className="block group article-item"
          >
            <article className="px-5 py-5 rounded-lg hover:bg-[#f8fafc] transition-colors border-b border-[#f1f5f9] last:border-b-0">
              {/* 分类 + 标签 */}
              <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                {article.categoryName && (
                  <Badge variant="secondary" className="text-xs bg-[#eff6ff] text-[#3b82f6] border-[#bfdbfe]">
                    {article.categoryName}
                  </Badge>
                )}
                {article.tagNames?.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs border-[#e2e8f0] text-[#64748b]">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* 标题 */}
              <h3 className="text-base font-semibold text-foreground mb-1.5 group-hover:text-[#3b82f6] transition-colors line-clamp-1">
                {article.title}
              </h3>

              {/* 摘要 */}
              <p className="text-sm text-[#64748b] line-clamp-2 mb-3 leading-relaxed">
                {article.summary}
              </p>

              {/* 元信息 */}
              <div className="flex items-center gap-4 text-xs text-[#94a3b8]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.createTime?.slice(0, 10)}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {article.viewCount} 阅读
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </AnimatedStagger>
  )
}
