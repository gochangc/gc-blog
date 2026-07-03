import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Eye, Clock } from 'lucide-react'
import { MagicCard } from '@/components/ui/magic-card'
import { BorderBeam } from '@/components/ui/border-beam'
import type { Article } from '@/lib/types/blog'

interface ArticleCardProps {
  article: Article
}

/** 博客文章卡片（深色主题 + MagicCard） */
export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/blog/${article.id}`} className="block group">
      <MagicCard
        className="h-full rounded-xl p-0 overflow-hidden"
        gradientColor="rgba(59, 130, 246, 0.06)"
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
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {article.categoryName && (
              <Badge variant="secondary" className="text-xs bg-[#3b82f6]/10 text-[#60a5fa] border-[#3b82f6]/20">
                {article.categoryName}
              </Badge>
            )}
            {article.tagNames?.slice(0, 3).map((tag) => (
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
        <BorderBeam size={60} duration={10} colorFrom="#3b82f6" colorTo="#6366f1" />
      </MagicCard>
    </Link>
  )
}
