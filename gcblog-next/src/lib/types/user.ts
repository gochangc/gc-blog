// 用户相关类型定义

/** 用户信息（对应 UserVO） */
export interface UserInfo {
  id: number
  username: string
  nickname: string
  avatar: string
  email: string
  roles: string[]
}

/** 登录表单 */
export interface LoginForm {
  username: string
  password: string
}

/** 登录响应（对应 LoginVO） */
export interface LoginResult {
  accessToken: string
  refreshToken: string
  expiresIn: number
  nickname: string
  avatar: string
}

/** 用户表单 DTO */
export interface UserFormData {
  username: string
  password?: string
  nickname?: string
  email?: string
}

/** 注册表单 DTO */
export interface RegisterFormData {
  username: string
  password: string
  nickname?: string
  email?: string
}
