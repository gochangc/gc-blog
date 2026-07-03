// 认证 API 接口

import { apiClient } from './client'
import type { LoginForm, LoginResult, RegisterFormData } from '@/lib/types/user'

/** 登录 */
export function loginApi(data: LoginForm) {
  return apiClient<LoginResult>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/** 注册 */
export function registerApi(data: RegisterFormData) {
  return apiClient<void>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/** 退出登录 */
export function logoutApi() {
  return apiClient<void>('/auth/logout', {
    method: 'POST',
  })
}

/** 刷新 Token */
export function refreshTokenApi(data: { refreshToken: string }) {
  return apiClient<LoginResult>('/auth/token/refresh', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
