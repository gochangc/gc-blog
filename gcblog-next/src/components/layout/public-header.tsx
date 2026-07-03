'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { useAuthStore } from '@/stores/auth-store'
import { LogOut, LayoutDashboard, Menu } from 'lucide-react'
import { BlurFade } from '@/components/ui/blur-fade'

const NAV_LINKS = [
  { label: '首页', href: '/' },
  { label: '博客', href: '/blog' },
  { label: '导航', href: '/navigation' },
]

/** 前台顶部导航栏（深色毛玻璃风格） */
export function PublicHeader() {
  const pathname = usePathname()
  const { isLoggedIn, userInfo, isAdmin, logout } = useAuthStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <BlurFade duration={0.6}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#6366f1] flex items-center justify-center text-white font-bold text-sm glow-blue-sm transition-all duration-300 group-hover:scale-105">
              GC
            </div>
            <span className="text-lg font-semibold text-foreground hidden sm:inline">
              Blog
            </span>
          </Link>

          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-[#60a5fa] bg-[#3b82f6]/10'
                      : 'text-[#94a3b8] hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#3b82f6] rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* 用户操作区 */}
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-white/5 transition-colors outline-none">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-br from-[#3b82f6] to-[#6366f1] text-white text-xs font-medium">
                      {userInfo?.nickname?.slice(0, 1) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-[#94a3b8] hidden sm:inline max-w-[100px] truncate">
                    {userInfo?.nickname || '用户'}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-[#1e293b] border-white/10">
                  {isAdmin && (
                    <DropdownMenuItem className="cursor-pointer focus:bg-white/10">
                      <Link href="/admin" className="flex items-center w-full">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        管理后台
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {isAdmin && <DropdownMenuSeparator className="bg-white/10" />}
                  <DropdownMenuItem
                    className="cursor-pointer text-[#ef4444] focus:bg-[#ef4444]/10 focus:text-[#ef4444]"
                    onClick={logout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    退出登录
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm" className="border-white/10 text-[#94a3b8] hover:text-foreground hover:border-[#3b82f6]/30 hover:bg-[#3b82f6]/10">
                  登录
                </Button>
              </Link>
            )}

            {/* 移动端菜单 */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors">
                <Menu className="w-5 h-5 text-[#94a3b8]" />
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#0b1120] border-white/6 w-64">
                <SheetTitle className="sr-only">导航菜单</SheetTitle>
                <nav className="flex flex-col gap-1 mt-8">
                  {NAV_LINKS.map((link) => {
                    const isActive =
                      link.href === '/'
                        ? pathname === '/'
                        : pathname.startsWith(link.href)
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                          isActive
                            ? 'text-[#60a5fa] bg-[#3b82f6]/10'
                            : 'text-[#94a3b8] hover:text-foreground hover:bg-white/5'
                        }`}
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </BlurFade>
    </header>
  )
}
