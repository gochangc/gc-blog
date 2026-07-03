import { HeroSection } from '@/components/home/hero-section'
import { RecentArticles } from '@/components/home/recent-articles'
import type { Article } from '@/lib/types/blog'

/** 首页（SSR） */
export default async function HomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'

  let articles: Article[] = []
  try {
    const res = await fetch(`${baseUrl}/blog/articles?current=1&size=6`, {
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
    <div>
      <HeroSection />
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-[#1e293b] mb-8">最新文章</h2>
        <RecentArticles articles={articles} />
      </section>
    </div>
  )
}
