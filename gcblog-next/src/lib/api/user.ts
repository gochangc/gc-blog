// 用户 API 接口

import { apiClient } from './client'
import type { UserInfo, UserFormData } from '@/lib/types/user'

/** 获取用户信息 */
export function getUserApi(id: number) {
  return apiClient<UserInfo>(`/users/${id}`)
}

/** 创建用户 */
export function createUserApi(data: UserFormData) {
  return apiClient<void>('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/** 更新用户 */
export function updateUserApi(id: number, data: UserFormData) {
  return apiClient<void>(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

/** 删除用户 */
export function deleteUserApi(id: number) {
  return apiClient<void>(`/users/${id}`, {
    method: 'DELETE',
  })
}
