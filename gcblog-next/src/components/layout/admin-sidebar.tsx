'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  PanelLeftClose,
  PanelLeft,
  Menu as MenuIcon,
} from 'lucide-react'
import { ADMIN_MENU_ITEMS } from '@/lib/constants'

interface AdminSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

/** 后台侧边栏 */
export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname()

  /** 判断菜单项是否激活 */
  const isActive = (path: string) => pathname.startsWith(path)

  const menuContent = (
    <nav className="flex flex-col gap-1 p-3">
      {ADMIN_MENU_ITEMS.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-3 h-12 px-3 rounded-lg transition-colors duration-200
              ${isActive(item.path)
                ? 'bg-[#6366f1]/20 text-[#818cf8]'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
              }
              ${collapsed ? 'justify-center px-0' : ''}`}
            title={collapsed ? item.label : undefined}
          >
            <Icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="text-sm whitespace-nowrap">{item.label}</span>}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <>
      {/* 桌面端侧边栏 */}
      <aside
        className={`hidden lg:flex flex-col h-screen bg-[#1e1b4b] transition-all duration-250 shrink-0
          ${collapsed ? 'w-16' : 'w-[220px]'}`}
      >
        {/* 顶部 Logo 区域 */}
        <div className="h-16 flex items-center justify-center border-b border-white/8">
          {collapsed ? (
            <span className="text-xl font-bold text-white">G</span>
          ) : (
            <span className="text-lg font-bold text-white">GCBlog Admin</span>
          )}
        </div>

        {/* 菜单 */}
        <div className="flex-1 overflow-y-auto">{menuContent}</div>

        {/* 底部折叠按钮 */}
        <div className="p-3 border-t border-white/8">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-white/60 hover:text-white hover:bg-white/10"
            onClick={onToggle}
          >
            {collapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
          </Button>
        </div>
      </aside>

      {/* 移动端侧边栏抽屉 */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger className="fixed top-3 left-3 z-50 inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 cursor-pointer">
            <MenuIcon className="w-5 h-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[220px] bg-[#1e1b4b] border-white/10 p-0">
            <div className="h-16 flex items-center justify-center border-b border-white/8">
              <span className="text-lg font-bold text-white">GCBlog Admin</span>
            </div>
            {menuContent}
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
