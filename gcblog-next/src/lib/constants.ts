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

/** 面包屑映射（路径 → 面包屑层级） */
export const BREADCRUMB_MAP: Record<string, Array<{ label: string; path: string }>> = {
  '/admin/articles': [{ label: '文章管理', path: '/admin/articles' }],
  '/admin/articles/new': [
    { label: '文章管理', path: '/admin/articles' },
    { label: '新建文章', path: '/admin/articles/new' },
  ],
  '/admin/categories': [{ label: '分类管理', path: '/admin/categories' }],
  '/admin/tags': [{ label: '标签管理', path: '/admin/tags' }],
  '/admin/nav-categories': [{ label: '导航分类', path: '/admin/nav-categories' }],
  '/admin/nav-links': [{ label: '导航链接', path: '/admin/nav-links' }],
  '/admin/users': [{ label: '用户管理', path: '/admin/users' }],
}

/** 侧边栏宽度常量 */
export const SIDEBAR_WIDTH = 220
export const SIDEBAR_COLLAPSED_WIDTH = 64
