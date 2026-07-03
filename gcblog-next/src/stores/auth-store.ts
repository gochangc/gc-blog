// 认证状态管理（Zustand）

import { create } from 'zustand'
import Cookies from 'js-cookie'
import { loginApi, logoutApi, refreshTokenApi } from '@/lib/api/auth'
import { getToken, setToken, clearToken } from '@/lib/api/client'
import type { LoginForm, LoginResult, UserInfo } from '@/lib/types/user'

const REFRESH_KEY = 'gcb_refresh'

interface AuthState {
  /** 访问令牌 */
  token: string | undefined
  /** 用户信息 */
  userInfo: UserInfo | null
  /** 是否已登录 */
  isLoggedIn: boolean
  /** 是否为管理员 */
  isAdmin: boolean

  /** 登录 */
  login: (form: LoginForm) => Promise<void>
  /** 退出登录 */
  logout: () => Promise<void>
  /** 刷新 Token */
  refresh: () => Promise<void>
  /** 设置用户信息 */
  setUserInfo: (info: UserInfo | null) => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: getToken(),
  userInfo: null,
  isLoggedIn: !!getToken(),
  isAdmin: false,

  login: async (form: LoginForm) => {
    const data: LoginResult = await loginApi(form)
    setToken(data.accessToken, data.refreshToken)
    set({
      token: data.accessToken,
      isLoggedIn: true,
      userInfo: {
        id: 0,
        username: '',
        nickname: data.nickname,
        avatar: data.avatar,
        email: '',
        roles: [],
      },
    })
  },

  logout: async () => {
    try {
      await logoutApi()
    } catch {
      // 忽略退出接口错误
    }
    clearToken()
    set({ token: undefined, userInfo: null, isLoggedIn: false, isAdmin: false })
  },

  refresh: async () => {
    const refreshToken = Cookies.get(REFRESH_KEY)
    if (!refreshToken) return
    try {
      const data = await refreshTokenApi({ refreshToken })
      setToken(data.accessToken, data.refreshToken)
      set({ token: data.accessToken })
    } catch {
      clearToken()
      set({ token: undefined, userInfo: null, isLoggedIn: false, isAdmin: false })
    }
  },

  setUserInfo: (info: UserInfo | null) => {
    set({
      userInfo: info,
      isAdmin: info?.roles?.includes('ROLE_ADMIN') ?? false,
    })
  },
}))
