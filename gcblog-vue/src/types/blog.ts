// 博客相关类型定义

export interface Article {
  id: number
  title: string
  summary: string
  content: string
  coverImage: string
  categoryId: number
  categoryName: string
  tags: Tag[]
  status: ArticleStatus
  viewCount: number
  createTime: string
  updateTime: string
}

export interface Category {
  id: number
  name: string
  description: string
  sort: number
}

export interface Tag {
  id: number
  name: string
}

export enum ArticleStatus {
  DRAFT = 0,
  PUBLISHED = 1,
  DELETED = 2
}

export interface ArticleQuery extends PageParams {
  keyword?: string
  categoryId?: number
  tagId?: number
  status?: ArticleStatus
}

import type { PageParams } from './global'
