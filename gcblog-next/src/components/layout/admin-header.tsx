'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LogOut, Home } from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import { BREADCRUMB_MAP } from '@/lib/constants'

/** 后台顶部栏 */
export function AdminHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const { userInfo, logout } = useAuthStore()

  /** 退出登录 */
  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  /** 获取面包屑数据 */
  const breadcrumbItems = BREADCRUMB_MAP[pathname] || [{ label: '管理后台', path: '/admin' }]

  return (
    <header className="h-16 border-b border-gray-200 bg-white px-6 flex items-center justify-between shrink-0">
      {/* 面包屑导航 */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin" className="flex items-center gap-1 text-[#94a3b8]">
              <Home className="w-4 h-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbItems.map((item, index) => (
            <span key={item.path || index} className="flex items-center">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={item.path}
                  className={index === breadcrumbItems.length - 1 ? 'text-[#1e293b] font-medium' : 'text-[#94a3b8]'}
                >
                  {item.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </span>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      {/* 右侧用户菜单 */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1.5 rounded-md cursor-pointer outline-none">
          <Avatar className="w-7 h-7">
            <AvatarFallback className="text-xs bg-[#6366f1] text-white">
              {(userInfo?.nickname || 'A').charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-[#475569] hidden sm:inline">
            {userInfo?.nickname || '管理员'}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={() => router.push('/')} className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            返回前台
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-600">
            <LogOut className="w-4 h-4" />
            退出登录
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
