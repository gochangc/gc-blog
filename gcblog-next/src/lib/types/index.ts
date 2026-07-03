// 通用类型定义

/** 后端统一响应（错误场景使用） */
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

/** 分页响应 */
export interface PageResponse<T> {
  list: T[]
  total: number
  current: number
  size: number
}

/** 分页请求参数 */
export interface PageParams {
  current: number
  size: number
  [key: string]: unknown
}
