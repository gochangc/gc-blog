// 导航相关类型定义

export interface NavCategory {
  id: number
  name: string
  icon: string
  sort: number
  links?: NavLink[]
}

export interface NavLink {
  id: number
  categoryId: number
  title: string
  url: string
  description: string
  icon: string
  sort: number
  visitCount: number
}
