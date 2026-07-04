import { ArticleCard } from '@/components/blog/article-card'
import type { Article } from '@/lib/types/blog'

/** 博客列表页（SSR，简洁浅色主题） */
export default async function BlogListPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'

  let articles: Article[] = []
  try {
    const res = await fetch(`${baseUrl}/blog/articles?current=1&size=20`, {
      next: { revalidate: 60 },
    })
    if (res.ok) {
      const body = await res.json()
      articles = Array.isArray(body) ? body : body.data || []
    }
  } catch {
    // 获取文章失败时显示空状态
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">博客</h1>
        <p className="text-[#64748b] text-sm">探索文章与分享</p>
      </div>

      {articles.length > 0 ? (
        <div className="rounded-xl border border-[#e2e8f0] bg-white overflow-hidden shadow-sm">
          <ArticleList articles={articles} />
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-[#64748b]">暂无文章</p>
        </div>
      )}
    </div>
  )
}

/** 文章列表（复用 ArticleCard 组件） */
function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <div className="space-y-1">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}
