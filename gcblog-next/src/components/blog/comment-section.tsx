'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Loader2, MessageSquare, LogIn } from 'lucide-react'
import { createCommentApi } from '@/lib/api/blog'
import { useAuthStore } from '@/stores/auth-store'

/** 评论表单校验 Schema */
const commentSchema = z.object({
  content: z.string().min(1, '请输入评论内容').max(500, '评论内容不能超过 500 字'),
})

type CommentFormData = z.infer<typeof commentSchema>

interface CommentSectionProps {
  articleId: number
}

/** 文章评论区（仅登录后可评论，评论列表始终可见） */
export function CommentSection({ articleId }: CommentSectionProps) {
  const { isLoggedIn } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  })

  const onSubmit = async (data: CommentFormData) => {
    setLoading(true)
    try {
      await createCommentApi({ articleId, content: data.content })
      toast.success('评论发表成功')
      reset()
      setSubmitted(true)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '评论发表失败'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-10 rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-5">
        <MessageSquare className="w-5 h-5 text-[#3b82f6]" />
        发表评论
      </h3>

      {!isLoggedIn ? (
        /* 未登录：提示登录 */
        <div className="text-center py-8">
          <LogIn className="w-10 h-10 text-[#94a3b8] mx-auto mb-3" />
          <p className="text-sm text-[#64748b] mb-4">登录后即可发表评论</p>
          <Link href="/login">
            <Button variant="outline" className="border-[#e2e8f0] text-[#475569] hover:text-foreground hover:border-[#3b82f6]/40 hover:bg-[#eff6ff]">
              去登录
            </Button>
          </Link>
        </div>
      ) : submitted ? (
        <div className="text-center py-6 text-[#22c55e]">
          评论已提交，感谢您的反馈！
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="comment-content" className="text-[#64748b] text-sm">评论内容</Label>
            <Textarea
              id="comment-content"
              placeholder="写下你的想法..."
              rows={4}
              className="bg-[#f8fafc] border-[#e2e8f0] text-foreground placeholder:text-[#94a3b8] focus:border-[#3b82f6]/50 focus:ring-[#3b82f6]/20"
              {...register('content')}
            />
            {errors.content && (
              <p className="text-sm text-[#ef4444]">{errors.content.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="bg-[#3b82f6] hover:bg-[#2563eb] text-sm"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                提交中...
              </>
            ) : (
              '发表评论'
            )}
          </Button>
        </form>
      )}
    </div>
  )
}
