import { NavCard } from '@/components/navigation/nav-card'
import type { NavCategory } from '@/lib/types/navigation'

/** 导航页（SSR，简洁浅色主题） */
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
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-foreground mb-1">导航</h1>
        <p className="text-[#64748b] text-sm">实用工具与资源导航</p>
      </div>

      {categories.length > 0 ? (
        <div className="space-y-12">
          {categories.map((category) => (
            <section key={category.id}>
              <h2 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-3">
                <span className="w-1 h-5 bg-gradient-to-b from-[#3b82f6] to-[#6366f1] rounded-full" />
                {category.name}
              </h2>
              {category.links && category.links.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {category.links.map((link) => (
                    <NavCard key={link.id} link={link} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#64748b]">该分类下暂无链接</p>
              )}
            </section>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-[#64748b]">暂无导航链接</p>
        </div>
      )}
    </div>
  )
}
