import Link from 'next/link'
import { Button } from '@/components/ui/button'

/** 404 页面 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-[#6366f1] mb-4">404</h1>
      <p className="text-xl text-[#475569] mb-6">页面不存在</p>
      <Link href="/">
        <Button className="bg-[#6366f1] hover:bg-[#4f46e5]">返回首页</Button>
      </Link>
    </div>
  )
}
