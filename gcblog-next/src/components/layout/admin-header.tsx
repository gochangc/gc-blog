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

/** 后台顶部栏（深色主题） */
export function AdminHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const { userInfo, logout } = useAuthStore()

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  const breadcrumbItems = BREADCRUMB_MAP[pathname] || [{ label: '管理后台', path: '/admin' }]

  return (
    <header className="h-16 border-b border-white/6 bg-[#0b1120] px-6 flex items-center justify-between shrink-0">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin" className="flex items-center gap-1 text-[#64748b] hover:text-foreground">
              <Home className="w-4 h-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbItems.map((item, index) => (
            <span key={item.path || index} className="flex items-center">
              <BreadcrumbSeparator className="text-[#475569]" />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={item.path}
                  className={index === breadcrumbItems.length - 1 ? 'text-foreground font-medium' : 'text-[#64748b]'}
                >
                  {item.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </span>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-white/5 px-2 py-1.5 rounded-lg cursor-pointer outline-none transition-colors">
          <Avatar className="w-7 h-7">
            <AvatarFallback className="text-xs bg-gradient-to-br from-[#3b82f6] to-[#6366f1] text-white">
              {(userInfo?.nickname || 'A').charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-[#94a3b8] hidden sm:inline">
            {userInfo?.nickname || '管理员'}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 bg-[#1e293b] border-white/10">
          <DropdownMenuItem onClick={() => router.push('/')} className="flex items-center gap-2 focus:bg-white/10">
            <Home className="w-4 h-4" />
            返回前台
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-[#ef4444] focus:bg-[#ef4444]/10 focus:text-[#ef4444]">
            <LogOut className="w-4 h-4" />
            退出登录
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
