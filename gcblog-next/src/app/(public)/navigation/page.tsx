import { NavCard } from '@/components/navigation/nav-card'
import { AnimatedSection } from '@/components/animation/animated-section'
import { AnimatedStagger } from '@/components/animation/animated-stagger'
import type { NavCategory } from '@/lib/types/navigation'

/** 导航页（SSR，简洁浅色主题 + 入场动画） */
export default async function NavigationPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'

  let categories: NavCategory[] = []
  try {
    const res = await fetch(`${baseUrl}/navigation/nav-categories`, {
      next: { revalidate: 60 },
    })
    if (res.ok) {
      const body = await res.json()
      categories = Array.isArray(body) ? body : body.data || []
    }
  } catch {
    // 获取分类失败时显示空状态
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <AnimatedSection className="mb-10" direction="down">
        <h1 className="text-2xl font-bold text-foreground mb-1">导航</h1>
        <p className="text-[#64748b] text-sm">实用工具与资源导航</p>
      </AnimatedSection>

      {categories.length > 0 ? (
        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <AnimatedSection key={category.id} direction="up" delay={categoryIndex * 0.1}>
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-3">
                  <span className="w-1 h-5 bg-gradient-to-b from-[#3b82f6] to-[#6366f1] rounded-full" />
                  {category.name}
                </h2>
                {category.links && category.links.length > 0 ? (
                  <AnimatedStagger
                    itemSelector=".nav-card-item"
                    stagger={0.06}
                    delay={0.1}
                  >
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {category.links.map((link) => (
                        <div key={link.id} className="nav-card-item">
                          <NavCard link={link} />
                        </div>
                      ))}
                    </div>
                  </AnimatedStagger>
                ) : (
                  <p className="text-sm text-[#64748b]">该分类下暂无链接</p>
                )}
              </section>
            </AnimatedSection>
          ))}
        </div>
      ) : (
        <AnimatedSection className="text-center py-20" direction="up">
          <p className="text-[#64748b]">暂无导航链接</p>
        </AnimatedSection>
      )}
    </div>
  )
}
