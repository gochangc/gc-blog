// 博客 API 接口

import { apiClient } from './client'
import type {
  Article,
  ArticleDetail,
  ArticleQuery,
  ArticleFormData,
  Category,
  CategoryFormData,
  Tag,
  TagFormData,
  CommentFormData,
} from '@/lib/types/blog'

// ===== 文章 =====

/** 获取文章列表（公开） */
export function getArticlesApi(params: ArticleQuery) {
  return apiClient<Article[]>('/blog/articles', { params })
}

/** 获取文章详情（公开） */
export function getArticleDetailApi(id: number) {
  return apiClient<ArticleDetail>(`/blog/articles/${id}`)
}

/** 创建文章 */
export function createArticleApi(data: ArticleFormData) {
  return apiClient<void>('/blog/admin/articles', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/** 更新文章 */
export function updateArticleApi(id: number, data: ArticleFormData) {
  return apiClient<void>(`/blog/admin/articles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

/** 发布文章 */
export function publishArticleApi(id: number) {
  return apiClient<void>(`/blog/admin/articles/${id}/publish`, {
    method: 'PUT',
  })
}

/** 删除文章 */
export function deleteArticleApi(id: number) {
  return apiClient<void>(`/blog/admin/articles/${id}`, {
    method: 'DELETE',
  })
}

// ===== 分类 =====

/** 获取分类列表 */
export function getCategoriesApi() {
  return apiClient<Category[]>('/blog/categories')
}

/** 创建分类 */
export function createCategoryApi(data: CategoryFormData) {
  return apiClient<void>('/blog/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/** 更新分类 */
export function updateCategoryApi(id: number, data: CategoryFormData) {
  return apiClient<void>(`/blog/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

/** 删除分类 */
export function deleteCategoryApi(id: number) {
  return apiClient<void>(`/blog/categories/${id}`, {
    method: 'DELETE',
  })
}

// ===== 标签 =====

/** 获取标签列表 */
export function getTagsApi() {
  return apiClient<Tag[]>('/blog/tags')
}

/** 创建标签 */
export function createTagApi(data: TagFormData) {
  return apiClient<void>('/blog/tags', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/** 删除标签 */
export function deleteTagApi(id: number) {
  return apiClient<void>(`/blog/tags/${id}`, {
    method: 'DELETE',
  })
}

// ===== 评论 =====

/** 发表评论 */
export function createCommentApi(data: CommentFormData) {
  return apiClient<void>('/blog/comments', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/** 删除评论 */
export function deleteCommentApi(id: number) {
  return apiClient<void>(`/blog/comments/${id}`, {
    method: 'DELETE',
  })
}
