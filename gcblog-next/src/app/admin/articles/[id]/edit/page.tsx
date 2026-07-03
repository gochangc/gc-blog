'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import { ArticleForm } from '@/components/blog/article-form'
import { getArticleDetailApi, updateArticleApi } from '@/lib/api/blog'
import type { ArticleDetail, ArticleFormData } from '@/lib/types/blog'

/** 编辑文章页面（深色主题） */
export default function EditArticlePage() {
  const router = useRouter()
  const params = useParams()
  const [article, setArticle] = useState<ArticleDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = Number(params.id)
    if (!id) return
    getArticleDetailApi(id)
      .then(setArticle)
      .catch(() => setArticle(null))
      .finally(() => setLoading(false))
  }, [params.id])

  const handleSubmit = async (data: ArticleFormData) => {
    await updateArticleApi(Number(params.id), data)
    router.push('/admin/articles')
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48 bg-white/5" />
        <Skeleton className="h-64 w-full bg-white/5" />
        <Skeleton className="h-96 w-full bg-white/5" />
      </div>
    )
  }

  if (!article) {
    return (
      <div className="text-center py-16 text-[#64748b]">
        文章不存在
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">编辑文章</h1>
      <ArticleForm
        isEdit
        initialData={{
          title: article.title,
          summary: '',
          content: article.content,
          coverImage: article.coverImage,
          categoryId: article.categoryId,
          tagIds: [],
        }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
