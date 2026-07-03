// 博客相关类型定义（对齐后端 VO 字段）

import type { PageParams } from '.'

/** 文章列表项（对应 ArticleVO） */
export interface Article {
  id: number
  title: string
  summary: string
  coverImage: string
  categoryName: string
  tagNames: string[]
  viewCount: number
  createTime: string
}

/** 文章详情（对应 ArticleDetailVO） */
export interface ArticleDetail {
  id: number
  title: string
  content: string
  coverImage: string
  categoryId: number
  categoryName: string
  tagNames: string[]
  viewCount: number
  createTime: string
  updateTime: string
}

/** 文章状态枚举 */
export enum ArticleStatus {
  DRAFT = 0,
  PUBLISHED = 1,
  DELETED = 2,
}

/** 文章查询参数 */
export interface ArticleQuery extends PageParams {
  keyword?: string
  categoryId?: number
  tagId?: number
  status?: ArticleStatus
}

/** 文章创建/编辑 DTO（对应 ArticleDTO） */
export interface ArticleFormData {
  title: string
  summary: string
  content: string
  coverImage: string
  categoryId: number
  tagIds: number[]
  isOriginal: number
  sourceUrl: string
}

/** 分类（对应 CategoryVO） */
export interface Category {
  id: number
  name: string
  description: string
  sort: number
  articleCount: number
}

/** 分类表单 DTO */
export interface CategoryFormData {
  name: string
  slug?: string
  description?: string
  sortOrder?: number
}

/** 标签（对应 Tag 实体） */
export interface Tag {
  id: number
  name: string
  slug: string
  color: string
  createTime?: string
}

/** 标签表单 DTO */
export interface TagFormData {
  name: string
  slug?: string
  color?: string
}

/** 评论表单 DTO */
export interface CommentFormData {
  articleId: number
  content: string
  parentId?: number
}
