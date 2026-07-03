'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Loader2, MessageSquare } from 'lucide-react'
import { createCommentApi } from '@/lib/api/blog'

/** 评论表单校验 Schema */
const commentSchema = z.object({
  content: z.string().min(1, '请输入评论内容').max(500, '评论内容不能超过 500 字'),
})

type CommentFormData = z.infer<typeof commentSchema>

interface CommentSectionProps {
  articleId: number
}

/** 文章评论区（深色主题） */
export function CommentSection({ articleId }: CommentSectionProps) {
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
    <div className="mt-10 rounded-xl border border-white/8 bg-white/[0.02] p-6">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-5">
        <MessageSquare className="w-5 h-5 text-[#60a5fa]" />
        发表评论
      </h3>

      {submitted ? (
        <div className="text-center py-6 text-[#22c55e]">
          评论已提交，感谢您的反馈！
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="comment-content" className="text-[#94a3b8] text-sm">评论内容</Label>
            <Textarea
              id="comment-content"
              placeholder="写下你的想法..."
              rows={4}
              className="bg-white/5 border-white/10 text-foreground placeholder:text-[#475569] focus:border-[#3b82f6]/50"
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
