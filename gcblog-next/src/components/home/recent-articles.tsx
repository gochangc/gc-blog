import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Eye, Clock } from 'lucide-react'
import type { Article } from '@/lib/types/blog'

interface RecentArticlesProps {
  articles: Article[]
}

/** 首页最新文章列表 */
export function RecentArticles({ articles }: RecentArticlesProps) {
  if (!articles.length) {
    return (
      <div className="text-center py-12 text-[#94a3b8]">
        暂无文章
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Link key={article.id} href={`/blog/${article.id}`}>
          <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
            {/* 封面图 */}
            {article.coverImage && (
              <div className="aspect-video overflow-hidden rounded-t-xl">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                {article.categoryName && (
                  <Badge variant="secondary" className="text-xs bg-[#6366f1]/10 text-[#6366f1]">
                    {article.categoryName}
                  </Badge>
                )}
                {article.tagNames?.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <CardTitle className="text-lg line-clamp-2 group-hover:text-[#6366f1] transition-colors">
                {article.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#475569] line-clamp-2 mb-3">
                {article.summary}
              </p>
              <div className="flex items-center gap-4 text-xs text-[#94a3b8]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.createTime?.slice(0, 10)}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {article.viewCount}
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
