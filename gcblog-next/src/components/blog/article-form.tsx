'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { MarkdownEditor } from '@/components/blog/markdown-editor'
import { getCategoriesApi, getTagsApi } from '@/lib/api/blog'
import type { ArticleFormData, Category, Tag } from '@/lib/types/blog'
import { Loader2, X } from 'lucide-react'

interface ArticleFormProps {
  initialData?: Partial<ArticleFormData>
  onSubmit: (data: ArticleFormData) => Promise<void>
  isEdit?: boolean
}

/** 文章编辑表单（深色主题） */
export function ArticleForm({ initialData, onSubmit, isEdit }: ArticleFormProps) {
  const [form, setForm] = useState<ArticleFormData>({
    title: initialData?.title || '',
    summary: initialData?.summary || '',
    content: initialData?.content || '',
    coverImage: initialData?.coverImage || '',
    categoryId: initialData?.categoryId || 0,
    tagIds: initialData?.tagIds || [],
    isOriginal: initialData?.isOriginal ?? 1,
    sourceUrl: initialData?.sourceUrl || '',
  })

  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    Promise.all([getCategoriesApi(), getTagsApi()])
      .then(([cats, tgs]) => {
        setCategories(cats)
        setTags(tgs)
      })
      .catch(() => {})
  }, [])

  const toggleTag = (tagId: number) => {
    setForm((prev) => ({
      ...prev,
      tagIds: prev.tagIds.includes(tagId)
        ? prev.tagIds.filter((id) => id !== tagId)
        : [...prev.tagIds, tagId],
    }))
  }

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      toast.error('请输入文章标题')
      return
    }
    if (!form.content.trim()) {
      toast.error('请输入文章内容')
      return
    }
    if (!form.categoryId) {
      toast.error('请选择文章分类')
      return
    }
    setSubmitting(true)
    try {
      await onSubmit(form)
      toast.success(isEdit ? '文章更新成功' : '文章创建成功')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : '操作失败')
    } finally {
      setSubmitting(false)
    }
  }

  /** 输入框通用样式 */
  const inputClass = 'bg-white/5 border-white/10 text-foreground placeholder:text-[#475569] focus:border-[#3b82f6]/50 focus:ring-[#3b82f6]/20'

  return (
    <div className="space-y-6">
      {/* 基本信息 */}
      <div className="rounded-xl border border-white/8 bg-white/[0.02] p-6">
        <h2 className="text-base font-semibold text-foreground mb-5">基本信息</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-[#94a3b8] text-sm">文章标题</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="请输入文章标题"
              className={`${inputClass} text-lg`}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#94a3b8] text-sm">文章摘要</Label>
            <Textarea
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              placeholder="请输入文章摘要（可选）"
              rows={3}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#94a3b8] text-sm">封面图片 URL</Label>
            <Input
              value={form.coverImage}
              onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
              placeholder="请输入封面图片地址（可选）"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* 分类和标签 */}
      <div className="rounded-xl border border-white/8 bg-white/[0.02] p-6">
        <h2 className="text-base font-semibold text-foreground mb-5">分类与标签</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-[#94a3b8] text-sm">文章分类</Label>
            <Select
              value={form.categoryId ? String(form.categoryId) : ''}
              onValueChange={(val) => setForm({ ...form, categoryId: Number(val) })}
            >
              <SelectTrigger className="bg-white/5 border-white/10 text-foreground">
                <SelectValue placeholder="请选择分类" />
              </SelectTrigger>
              <SelectContent className="bg-[#1e293b] border-white/10">
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)} className="focus:bg-white/10">
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-[#94a3b8] text-sm">文章标签</Label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant={form.tagIds.includes(tag.id) ? 'default' : 'outline'}
                  className={`cursor-pointer transition-colors ${
                    form.tagIds.includes(tag.id)
                      ? 'bg-[#3b82f6] hover:bg-[#2563eb] text-white'
                      : 'border-white/10 text-[#94a3b8] hover:bg-white/5'
                  }`}
                  onClick={() => toggleTag(tag.id)}
                >
                  {tag.name}
                  {form.tagIds.includes(tag.id) && <X className="w-3 h-3 ml-1" />}
                </Badge>
              ))}
              {tags.length === 0 && (
                <span className="text-sm text-[#64748b]">暂无可用标签</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 文章内容 */}
      <div className="rounded-xl border border-white/8 bg-white/[0.02] p-6">
        <h2 className="text-base font-semibold text-foreground mb-5">文章内容</h2>
        <MarkdownEditor
          value={form.content}
          onChange={(content) => setForm({ ...form, content })}
          height={500}
        />
      </div>

      {/* 提交按钮 */}
      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={() => window.history.back()} className="border-white/10 text-[#94a3b8] hover:bg-white/5">
          取消
        </Button>
        <Button onClick={handleSubmit} disabled={submitting} className="bg-[#3b82f6] hover:bg-[#2563eb]">
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              提交中...
            </>
          ) : (
            isEdit ? '更新文章' : '创建文章'
          )}
        </Button>
      </div>
    </div>
  )
}
