// 用户相关类型定义

export interface UserInfo {
  id: number
  username: string
  nickname: string
  avatar: string
  email: string
  roles: string[]
  permissions: string[]
}

export interface LoginForm {
  username: string
  password: string
}

export interface TokenInfo {
  accessToken: string
  refreshToken: string
  expiresIn: number
}
