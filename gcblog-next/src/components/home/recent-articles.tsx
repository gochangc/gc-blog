import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Eye, Clock } from 'lucide-react'
import { MagicCard } from '@/components/ui/magic-card'
import { BlurFade } from '@/components/ui/blur-fade'
import { BorderBeam } from '@/components/ui/border-beam'
import type { Article } from '@/lib/types/blog'

interface RecentArticlesProps {
  articles: Article[]
}

/** 首页最新文章列表（MagicCard 深色风格） */
export function RecentArticles({ articles }: RecentArticlesProps) {
  if (!articles.length) {
    return (
      <div className="text-center py-16">
        <p className="text-[#64748b] text-sm">暂无文章</p>
      </div>
    )
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, i) => (
        <BlurFade key={article.id} delay={0.1 + i * 0.08} inView>
          <Link href={`/blog/${article.id}`} className="block h-full group">
            <MagicCard
              className="h-full rounded-xl p-0 overflow-hidden"
              gradientColor="rgba(59, 130, 246, 0.08)"
              gradientFrom="#3b82f6"
              gradientTo="#6366f1"
            >
              {/* 封面图 */}
              {article.coverImage && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  {article.categoryName && (
                    <Badge variant="secondary" className="text-xs bg-[#3b82f6]/10 text-[#60a5fa] border-[#3b82f6]/20">
                      {article.categoryName}
                    </Badge>
                  )}
                  {article.tagNames?.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-white/10 text-[#94a3b8]">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-[#60a5fa] transition-colors duration-200">
                  {article.title}
                </h3>
                <p className="text-sm text-[#94a3b8] line-clamp-2 mb-4 leading-relaxed">
                  {article.summary}
                </p>
                <div className="flex items-center gap-4 text-xs text-[#64748b]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.createTime?.slice(0, 10)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {article.viewCount}
                  </span>
                </div>
              </div>
              <BorderBeam size={80} duration={8} colorFrom="#3b82f6" colorTo="#6366f1" />
            </MagicCard>
          </Link>
        </BlurFade>
      ))}
    </div>
  )
}
