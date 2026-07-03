'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
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

/** 后台侧边栏（深色风格） */
export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => pathname.startsWith(path)

  const menuContent = (
    <nav className="flex flex-col gap-1 p-3">
      {ADMIN_MENU_ITEMS.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-3 h-11 px-3 rounded-lg transition-all duration-200
              ${isActive(item.path)
                ? 'bg-[#3b82f6]/15 text-[#60a5fa] shadow-[inset_0_0_0_1px_rgba(59,130,246,0.2)]'
                : 'text-[#94a3b8] hover:bg-white/5 hover:text-foreground'
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
        className={`hidden lg:flex flex-col h-screen transition-all duration-250 shrink-0 border-r border-white/6
          ${collapsed ? 'w-16' : 'w-[220px]'} bg-[#0b1120]`}
      >
        {/* 顶部 Logo */}
        <div className="h-16 flex items-center justify-center border-b border-white/6">
          {collapsed ? (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#6366f1] flex items-center justify-center text-white font-bold text-xs">
              GC
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#6366f1] flex items-center justify-center text-white font-bold text-xs">
                GC
              </div>
              <span className="text-sm font-semibold text-foreground">Admin</span>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">{menuContent}</div>

        <div className="p-3 border-t border-white/6">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-[#64748b] hover:text-foreground hover:bg-white/5"
            onClick={onToggle}
          >
            {collapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
          </Button>
        </div>
      </aside>

      {/* 移动端侧边栏 */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger className="fixed top-3 left-3 z-50 inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/5 cursor-pointer">
            <MenuIcon className="w-5 h-5 text-[#94a3b8]" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[220px] bg-[#0b1120] border-white/6 p-0">
            <SheetTitle className="sr-only">管理后台导航</SheetTitle>
            <div className="h-16 flex items-center justify-center border-b border-white/6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#6366f1] flex items-center justify-center text-white font-bold text-xs">
                  GC
                </div>
                <span className="text-sm font-semibold text-foreground">Admin</span>
              </div>
            </div>
            {menuContent}
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
