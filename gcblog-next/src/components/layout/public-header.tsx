'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

const NAV_LINKS = [
  { label: '首页', href: '/' },
  { label: '导航', href: '/navigation' },
  { label: '关于我', href: '/about' },
]

/** 前台顶部导航栏（浅色毛玻璃风格，免登录浏览） */
export function PublicHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  /** 判断导航项是否激活 */
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#6366f1] flex items-center justify-center text-white font-bold text-sm shadow-md transition-all duration-300 group-hover:scale-105">
            GC
          </div>
          <span className="text-lg font-semibold text-foreground hidden sm:inline">
            Blog
          </span>
        </Link>

        {/* 桌面端导航 */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive(link.href)
                  ? 'text-[#3b82f6] bg-[#eff6ff]'
                  : 'text-[#475569] hover:text-foreground hover:bg-[#f1f5f9]'
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#3b82f6] rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* 移动端菜单 */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger className="md:hidden p-2 rounded-lg hover:bg-[#f1f5f9] transition-colors">
            <Menu className="w-5 h-5 text-[#475569]" />
          </SheetTrigger>
          <SheetContent side="right" className="bg-white border-[#e2e8f0] w-64">
            <SheetTitle className="sr-only">导航菜单</SheetTitle>
            <nav className="flex flex-col gap-1 mt-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.href)
                      ? 'text-[#3b82f6] bg-[#eff6ff]'
                      : 'text-[#475569] hover:text-foreground hover:bg-[#f1f5f9]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
