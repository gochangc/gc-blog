'use client'

import Link from 'next/link'
import { Flame, Eye } from 'lucide-react'
import { AnimatedStagger } from '@/components/animation/animated-stagger'
import type { Article } from '@/lib/types/blog'

interface HotArticlesProps {
  articles: Article[]
}

/** 右侧热度排行榜（按阅读量排序，展示 Top 10，带交错入场动画） */
export function HotArticles({ articles }: HotArticlesProps) {
  const sorted = [...articles]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 10)

  return (
    <aside className="lg:w-56 xl:w-64 shrink-0">
      <div className="sticky top-20">
        <div className="rounded-xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
            <Flame className="w-4 h-4 text-[#f59e0b]" />
            热度排行
          </h4>

          {sorted.length > 0 ? (
            <AnimatedStagger itemSelector=".hot-item" stagger={0.06}>
              <div className="space-y-3">
                {sorted.map((article, index) => (
                  <Link
                    key={article.id}
                    href={`/blog/${article.id}`}
                    className="flex items-start gap-2.5 group hot-item"
                  >
                    {/* 序号：前三名特殊颜色 */}
                    <span
                      className={`shrink-0 w-5 h-5 rounded text-xs font-bold flex items-center justify-center ${
                        index < 3
                          ? 'bg-[#3b82f6] text-white'
                          : 'bg-[#f1f5f9] text-[#64748b]'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-[#475569] line-clamp-2 leading-snug group-hover:text-[#3b82f6] transition-colors">
                        {article.title}
                      </p>
                      <span className="flex items-center gap-1 mt-1 text-xs text-[#94a3b8]">
                        <Eye className="w-3 h-3" />
                        {article.viewCount}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </AnimatedStagger>
          ) : (
            <p className="text-xs text-[#64748b]">暂无数据</p>
          )}
        </div>
      </div>
    </aside>
  )
}
