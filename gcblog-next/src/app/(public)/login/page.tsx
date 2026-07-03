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
import { useAuthStore } from '@/stores/auth-store'
import { MagicCard } from '@/components/ui/magic-card'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { BlurFade } from '@/components/ui/blur-fade'
import { Particles } from '@/components/ui/particles'
import { Loader2 } from 'lucide-react'

/** 登录表单校验 Schema */
const loginSchema = z.object({
  username: z.string().min(1, '请输入用户名'),
  password: z.string().min(1, '请输入密码'),
})

type LoginFormData = z.infer<typeof loginSchema>

/** 登录表单内容 */
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-[#94a3b8] text-sm">用户名</Label>
        <Input
          id="username"
          placeholder="请输入用户名"
          autoComplete="username"
          className="bg-white/5 border-white/10 text-foreground placeholder:text-[#475569] focus:border-[#3b82f6]/50 focus:ring-[#3b82f6]/20"
          {...register('username')}
        />
        {errors.username && (
          <p className="text-sm text-[#ef4444]">{errors.username.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-[#94a3b8] text-sm">密码</Label>
        <Input
          id="password"
          type="password"
          placeholder="请输入密码"
          autoComplete="current-password"
          className="bg-white/5 border-white/10 text-foreground placeholder:text-[#475569] focus:border-[#3b82f6]/50 focus:ring-[#3b82f6]/20"
          {...register('password')}
        />
        {errors.password && (
          <p className="text-sm text-[#ef4444]">{errors.password.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full bg-[#3b82f6] hover:bg-[#2563eb] h-11 text-sm font-medium rounded-lg"
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

/** 登录页面（深色主题 + Magic UI） */
export default function LoginPage() {
  return (
    <div className="relative flex items-center justify-center min-h-[80vh] px-4">
      {/* 背景粒子 */}
      <Particles
        className="absolute inset-0"
        quantity={40}
        color="#3b82f6"
        size={0.5}
        staticity={40}
        ease={70}
      />

      <BlurFade delay={0.1} duration={0.6}>
        <div className="w-full max-w-md">
          <MagicCard
            className="rounded-2xl p-0"
            gradientColor="rgba(59, 130, 246, 0.06)"
            gradientFrom="#3b82f6"
            gradientTo="#6366f1"
          >
            <div className="p-8">
              {/* Logo */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2.5 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#6366f1] flex items-center justify-center text-white font-bold text-base glow-blue-sm">
                    GC
                  </div>
                  <span className="text-2xl font-bold text-foreground">Blog</span>
                </div>
                <h2 className="text-lg font-semibold text-foreground">欢迎回来</h2>
                <p className="text-sm text-[#64748b] mt-1">请登录您的账号</p>
              </div>

              <Suspense fallback={<div className="text-center py-4 text-[#64748b]">加载中...</div>}>
                <LoginFormContent />
              </Suspense>
            </div>
          </MagicCard>
        </div>
      </BlurFade>
    </div>
  )
}
