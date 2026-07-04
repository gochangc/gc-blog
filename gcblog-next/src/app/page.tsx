import { TypewriterHero } from '@/components/home/typewriter-hero'
import { ProfileSidebar } from '@/components/home/profile-sidebar'
import { ArticleList } from '@/components/home/article-list'
import { HotArticles } from '@/components/home/hot-articles'
import type { Article, Category } from '@/lib/types/blog'

/** 首页（SSR，经典博客风格：打字机 Hero + 三栏布局） */
export default async function HomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'

  // 并行获取文章和分类数据
  let articles: Article[] = []
  let categories: Category[] = []

  try {
    const [articlesRes, categoriesRes] = await Promise.all([
      fetch(`${baseUrl}/blog/articles?current=1&size=50`, { next: { revalidate: 60 } }),
      fetch(`${baseUrl}/blog/categories`, { next: { revalidate: 60 } }),
    ])

    if (articlesRes.ok) {
      const body = await articlesRes.json()
      articles = Array.isArray(body) ? body : body.data || []
    }
    if (categoriesRes.ok) {
      const body = await categoriesRes.json()
      categories = Array.isArray(body) ? body : body.data || []
    }
  } catch {
    // 获取失败时显示空状态
  }

  return (
    <div>
      {/* 打字机 Hero 区域 */}
      <TypewriterHero />

      {/* 三栏文章列表布局 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-6">
          {/* 左侧：个人信息栏（lg 以上显示） */}
          <div className="hidden lg:block">
            <ProfileSidebar categories={categories} articleCount={articles.length} />
          </div>

          {/* 中间：文章列表 */}
          <div className="flex-1 min-w-0">
            <div className="rounded-xl border border-[#e2e8f0] bg-white overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-[#f1f5f9]">
                <h2 className="text-base font-semibold text-foreground">最新文章</h2>
              </div>
              <ArticleList articles={articles} />
            </div>
          </div>

          {/* 右侧：热度排行（lg 以上显示） */}
          <div className="hidden lg:block">
            <HotArticles articles={articles} />
          </div>
        </div>
      </section>
    </div>
  )
}
