import { Skeleton } from '@/components/ui/skeleton'

/** 前台全局加载状态 */
export default function PublicLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Skeleton className="h-10 w-48 mb-8" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  )
}
