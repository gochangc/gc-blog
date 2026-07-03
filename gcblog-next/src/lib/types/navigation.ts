// 导航相关类型定义（对齐后端 VO 字段）

/** 导航链接（对应 NavLinkVO） */
export interface NavLink {
  id: number
  categoryId: number
  name: string
  url: string
  description: string
  icon: string
  sortOrder: number
  clickCount: number
}

/** 导航分类（对应 NavCategoryVO，含嵌套链接） */
export interface NavCategory {
  id: number
  name: string
  icon: string
  sortOrder: number
  links: NavLink[]
}

/** 导航链接表单 DTO */
export interface NavLinkFormData {
  categoryId: number
  name: string
  url: string
  description?: string
  icon?: string
  sortOrder?: number
}

/** 导航分类表单 DTO */
export interface NavCategoryFormData {
  name: string
  icon?: string
  sortOrder?: number
}
