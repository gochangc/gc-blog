'use client'

import { useRouter } from 'next/navigation'
import { ArticleForm } from '@/components/blog/article-form'
import { createArticleApi } from '@/lib/api/blog'
import type { ArticleFormData } from '@/lib/types/blog'

/** 新建文章页面 */
export default function NewArticlePage() {
  const router = useRouter()

  /** 提交创建文章 */
  const handleSubmit = async (data: ArticleFormData) => {
    await createArticleApi(data)
    router.push('/admin/articles')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1e293b] mb-6">新建文章</h1>
      <ArticleForm onSubmit={handleSubmit} />
    </div>
  )
}
