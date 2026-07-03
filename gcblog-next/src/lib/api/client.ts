// fetch 请求封装（替代 axios）

import Cookies from 'js-cookie'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'
const TOKEN_KEY = 'gcb_token'
const REFRESH_KEY = 'gcb_refresh'

/** 获取存储的 Token */
export function getToken(): string | undefined {
  return Cookies.get(TOKEN_KEY)
}

/** 设置 Token */
export function setToken(token: string, refreshToken: string): void {
  Cookies.set(TOKEN_KEY, token, { expires: 1 }) // 1 天
  Cookies.set(REFRESH_KEY, refreshToken, { expires: 7 }) // 7 天
}

/** 清除 Token */
export function clearToken(): void {
  Cookies.remove(TOKEN_KEY)
  Cookies.remove(REFRESH_KEY)
}

/** API 错误类 */
export class ApiError extends Error {
  code: number
  constructor(code: number, message: string) {
    super(message)
    this.code = code
    this.name = 'ApiError'
  }
}

/** 查询参数构建器 */
function buildParams(params?: Record<string, unknown>): string {
  if (!params) return ''
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value))
    }
  })
  const str = searchParams.toString()
  return str ? `?${str}` : ''
}

/** 刷新 Token */
async function doRefreshToken(): Promise<boolean> {
  const refreshToken = Cookies.get(REFRESH_KEY)
  if (!refreshToken) return false

  try {
    const res = await fetch(`${BASE_URL}/auth/token/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })
    if (!res.ok) return false
    const data = await res.json()
    if (data.accessToken) {
      setToken(data.accessToken, data.refreshToken)
      return true
    }
    return false
  } catch {
    return false
  }
}

/** 核心请求函数 */
export async function apiClient<T = unknown>(
  endpoint: string,
  options: RequestInit & {
    params?: Record<string, unknown>
  } = {},
): Promise<T> {
  const { params, ...fetchOptions } = options
  const url = `${BASE_URL}${endpoint}${buildParams(params)}`

  // 构建请求头
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((fetchOptions.headers as Record<string, string>) || {}),
  }
  const token = getToken()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  // 发起请求
  let res = await fetch(url, { ...fetchOptions, headers })

  // 401 时尝试刷新 Token 重试一次
  if (res.status === 401 && token) {
    const refreshed = await doRefreshToken()
    if (refreshed) {
      headers['Authorization'] = `Bearer ${getToken()}`
      res = await fetch(url, { ...fetchOptions, headers })
    }
  }

  // 处理响应
  if (!res.ok) {
    let message = '请求失败'
    try {
      const body = await res.json()
      message = body.message || message
    } catch {
      // 忽略解析错误
    }
    throw new ApiError(res.status, message)
  }

  // 204 No Content
  if (res.status === 204) return undefined as T

  const body = await res.json()

  // 兼容 {code, message, data} 包装格式（错误响应）
  if (body && typeof body === 'object' && 'code' in body && 'message' in body) {
    if (body.code !== 200) {
      throw new ApiError(body.code, body.message || '请求失败')
    }
    return body.data as T
  }

  // 直接返回 VO 数据
  return body as T
}
