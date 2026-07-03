import { ArticleCard } from '@/components/blog/article-card'
import { BlurFade } from '@/components/ui/blur-fade'
import type { Article } from '@/lib/types/blog'

/** 博客列表页（SSR，深色主题） */
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
    <div className="max-w-6xl mx-auto px-6 py-8">
      <BlurFade delay={0.1}>
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">博客</h1>
          <p className="text-[#64748b] text-sm">探索技术文章与分享</p>
        </div>
      </BlurFade>

      {articles.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <BlurFade key={article.id} delay={0.15 + i * 0.06} inView>
              <ArticleCard article={article} />
            </BlurFade>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-[#64748b]">暂无文章</p>
        </div>
      )}
    </div>
  )
}
