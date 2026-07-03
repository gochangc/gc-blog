'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

/** 全局错误边界 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('应用错误:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-4xl font-bold text-[#ef4444] mb-4">出错了</h1>
      <p className="text-lg text-[#475569] mb-6">
        {error.message || '发生了未知错误，请稍后重试'}
      </p>
      <Button onClick={reset} className="bg-[#6366f1] hover:bg-[#4f46e5]">
        重试
      </Button>
    </div>
  )
}
