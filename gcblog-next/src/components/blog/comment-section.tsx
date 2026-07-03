'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

/** 文章评论区 */
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

  /** 提交评论 */
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
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <MessageSquare className="w-5 h-5" />
          发表评论
        </CardTitle>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="text-center py-4 text-[#22c55e]">
            评论已提交，感谢您的反馈！
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="comment-content">评论内容</Label>
              <Textarea
                id="comment-content"
                placeholder="写下你的想法..."
                rows={4}
                {...register('content')}
              />
              {errors.content && (
                <p className="text-sm text-red-500">{errors.content.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="bg-[#6366f1] hover:bg-[#4f46e5]"
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
      </CardContent>
    </Card>
  )
}
