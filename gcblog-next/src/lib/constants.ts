// 常量配置

import {
  FileText,
  FolderOpen,
  Tag,
  Navigation,
  Link,
  Users,
  type LucideIcon,
} from 'lucide-react'

/** 侧边栏菜单项 */
export interface SidebarMenuItem {
  path: string
  label: string
  icon: LucideIcon
}

/** 后台侧边栏菜单配置 */
export const ADMIN_MENU_ITEMS: SidebarMenuItem[] = [
  { path: '/admin/articles', label: '文章管理', icon: FileText },
  { path: '/admin/categories', label: '分类管理', icon: FolderOpen },
  { path: '/admin/tags', label: '标签管理', icon: Tag },
  { path: '/admin/nav-categories', label: '导航分类', icon: Navigation },
  { path: '/admin/nav-links', label: '导航链接', icon: Link },
  { path: '/admin/users', label: '用户管理', icon: Users },
]

/** 前台导航项 */
export const NAV_ITEMS = [
  { path: '/', label: '首页' },
  { path: '/blog', label: '博客' },
  { path: '/navigation', label: '导航' },
]

/** 面包屑映射（路径 → 标题） */
export const BREADCRUMB_MAP: Record<string, string> = {
  '/admin': '管理后台',
  '/admin/articles': '文章管理',
  '/admin/articles/new': '新建文章',
  '/admin/categories': '分类管理',
  '/admin/tags': '标签管理',
  '/admin/nav-categories': '导航分类',
  '/admin/nav-links': '导航链接',
  '/admin/users': '用户管理',
}

/** 侧边栏宽度常量 */
export const SIDEBAR_WIDTH = 220
export const SIDEBAR_COLLAPSED_WIDTH = 64
