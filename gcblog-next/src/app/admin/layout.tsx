'use client'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 bg-[#1e1b4b] text-white p-4">
        <h2 className="text-lg font-bold mb-4">GCBlog Admin</h2>
        <nav className="space-y-2">
          <a href="/admin/articles" className="block py-2 px-3 rounded hover:bg-white/10">文章管理</a>
          <a href="/admin/categories" className="block py-2 px-3 rounded hover:bg-white/10">分类管理</a>
          <a href="/admin/tags" className="block py-2 px-3 rounded hover:bg-white/10">标签管理</a>
          <a href="/admin/nav-categories" className="block py-2 px-3 rounded hover:bg-white/10">导航分类</a>
          <a href="/admin/nav-links" className="block py-2 px-3 rounded hover:bg-white/10">导航链接</a>
          <a href="/admin/users" className="block py-2 px-3 rounded hover:bg-white/10">用户管理</a>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  )
}
