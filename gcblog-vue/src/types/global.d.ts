// 全局类型声明

// 统一响应格式
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

// 分页响应
export interface PageResponse<T = unknown> {
  records: T[]
  total: number
  current: number
  size: number
}

// 分页请求参数
export interface PageParams {
  current: number
  size: number
}
