import { ArticleCard } from '@/components/blog/article-card'
import type { Article } from '@/lib/types/blog'

/** 博客列表页（SSR） */
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
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-[#1e293b] mb-8">博客</h1>
      {articles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-[#94a3b8]">
          暂无文章
        </div>
      )}
    </div>
  )
}
