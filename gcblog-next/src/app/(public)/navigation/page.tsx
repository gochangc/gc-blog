import { NavCard } from '@/components/navigation/nav-card'
import type { NavCategory } from '@/lib/types/navigation'

/** 导航页（SSR，按分类分组展示） */
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
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-[#1e293b] mb-8">导航</h1>

      {categories.length > 0 ? (
        <div className="space-y-10">
          {categories.map((category) => (
            <section key={category.id}>
              <h2 className="text-xl font-semibold text-[#1e293b] mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#6366f1] rounded-full" />
                {category.name}
              </h2>
              {category.links && category.links.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {category.links.map((link) => (
                    <NavCard key={link.id} link={link} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#94a3b8]">该分类下暂无链接</p>
              )}
            </section>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-[#94a3b8]">
          暂无导航链接
        </div>
      )}
    </div>
  )
}
