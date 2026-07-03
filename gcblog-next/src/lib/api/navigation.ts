// 导航 API 接口

import { apiClient } from './client'
import type {
  NavCategory,
  NavCategoryFormData,
  NavLink,
  NavLinkFormData,
} from '@/lib/types/navigation'

// ===== 导航分类 =====

/** 获取导航分类列表（含嵌套链接） */
export function getNavCategoriesApi() {
  return apiClient<NavCategory[]>('/navigation/nav-categories')
}

/** 创建导航分类 */
export function createNavCategoryApi(data: NavCategoryFormData) {
  return apiClient<void>('/navigation/nav-categories', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/** 更新导航分类 */
export function updateNavCategoryApi(id: number, data: NavCategoryFormData) {
  return apiClient<void>(`/navigation/nav-categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

/** 删除导航分类 */
export function deleteNavCategoryApi(id: number) {
  return apiClient<void>(`/navigation/nav-categories/${id}`, {
    method: 'DELETE',
  })
}

// ===== 导航链接 =====

/** 获取导航链接列表 */
export function getNavLinksApi() {
  return apiClient<NavLink[]>('/navigation/nav-links')
}

/** 记录链接访问 */
export function recordVisitApi(id: number) {
  return apiClient<void>(`/navigation/nav-links/${id}/visit`, {
    method: 'POST',
  })
}

/** 创建导航链接 */
export function createNavLinkApi(data: NavLinkFormData) {
  return apiClient<void>('/navigation/admin/nav-links', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/** 更新导航链接 */
export function updateNavLinkApi(id: number, data: NavLinkFormData) {
  return apiClient<void>(`/navigation/admin/nav-links/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

/** 删除导航链接 */
export function deleteNavLinkApi(id: number) {
  return apiClient<void>(`/navigation/admin/nav-links/${id}`, {
    method: 'DELETE',
  })
}
