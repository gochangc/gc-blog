'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuthStore } from '@/stores/auth-store'
import { NAV_ITEMS } from '@/lib/constants'

/** 前台顶部导航栏 */
export function PublicHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const { isLoggedIn, userInfo, isAdmin, logout } = useAuthStore()
  const [scrolled, setScrolled] = useState(false)

  // 监听滚动，控制阴影显示
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /** 判断导航项是否激活 */
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  /** 退出登录 */
  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full h-16 z-50 transition-shadow duration-200
        bg-white/85 backdrop-blur-xl
        ${scrolled ? 'shadow-sm border-b border-gray-200' : ''}`}
    >
      <div className="flex items-center justify-between max-w-7xl h-full mx-auto px-6">
        {/* 左侧 Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-[#6366f1] text-white rounded-md text-sm font-bold">
            GC
          </span>
          <span className="text-xl font-bold text-[#1e1b4b]">Blog</span>
        </Link>

        {/* 中间导航 */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`relative text-[15px] py-1 transition-colors duration-200
                ${isActive(item.path)
                  ? 'text-[#6366f1] font-medium'
                  : 'text-[#475569] hover:text-[#6366f1]'
                }`}
            >
              {item.label}
              {/* 激活下划线 */}
              {isActive(item.path) && (
                <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-[#6366f1] rounded-sm" />
              )}
            </Link>
          ))}
        </nav>

        {/* 右侧用户操作 */}
        <div className="flex items-center gap-2 shrink-0">
          {isLoggedIn ? (
            <>
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs bg-[#6366f1] text-white">
                  {(userInfo?.nickname || 'U').charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-[#1e293b] max-w-20 truncate">
                {userInfo?.nickname || '用户'}
              </span>
              {isAdmin && (
                <Link href="/admin">
                  <Button variant="ghost" size="sm">管理后台</Button>
                </Link>
              )}
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                退出
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button size="sm" className="rounded-full bg-[#6366f1] hover:bg-[#4f46e5]">
                登录
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
