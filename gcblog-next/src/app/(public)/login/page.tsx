'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/stores/auth-store'
import { Loader2 } from 'lucide-react'

/** 登录表单校验 Schema */
const loginSchema = z.object({
  username: z.string().min(1, '请输入用户名'),
  password: z.string().min(1, '请输入密码'),
})

type LoginFormData = z.infer<typeof loginSchema>

/** 登录表单内容（使用 useSearchParams 需要 Suspense 包裹） */
function LoginFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuthStore()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  /** 提交登录 */
  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    try {
      await login(data)
      toast.success('登录成功')
      const redirect = searchParams.get('redirect')
      router.push(redirect || '/')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '登录失败，请检查用户名和密码'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">用户名</Label>
        <Input
          id="username"
          placeholder="请输入用户名"
          autoComplete="username"
          {...register('username')}
        />
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">密码</Label>
        <Input
          id="password"
          type="password"
          placeholder="请输入密码"
          autoComplete="current-password"
          {...register('password')}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full bg-[#6366f1] hover:bg-[#4f46e5]"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            登录中...
          </>
        ) : (
          '登录'
        )}
      </Button>
    </form>
  )
}

/** 登录页面 */
export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center w-10 h-10 bg-[#6366f1] text-white rounded-lg text-base font-bold">
              GC
            </span>
            <span className="text-2xl font-bold text-[#1e1b4b]">Blog</span>
          </div>
          <CardTitle className="text-xl">欢迎回来</CardTitle>
          <CardDescription>请登录您的账号</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div className="text-center py-4 text-muted-foreground">加载中...</div>}>
            <LoginFormContent />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
