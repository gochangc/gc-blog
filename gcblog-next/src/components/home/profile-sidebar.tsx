import Link from 'next/link'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { FileText, FolderOpen, Tag } from 'lucide-react'
import type { Category } from '@/lib/types/blog'

interface ProfileSidebarProps {
  categories: Category[]
  articleCount: number
}

/** 左侧个人信息栏（经典博客风格，浅色主题） */
export function ProfileSidebar({ categories, articleCount }: ProfileSidebarProps) {
  return (
    <aside className="lg:w-64 xl:w-72 shrink-0">
      <div className="sticky top-20 space-y-5">
        {/* 个人信息卡片 */}
        <div className="rounded-xl border border-[#e2e8f0] bg-white p-5 text-center shadow-sm">
          <Avatar className="w-20 h-20 mx-auto mb-4 border-2 border-[#e2e8f0]">
            <AvatarFallback className="bg-gradient-to-br from-[#3b82f6] to-[#6366f1] text-white text-2xl font-bold">
              GC
            </AvatarFallback>
          </Avatar>
          <h3 className="text-base font-semibold text-foreground mb-1">GCBlog</h3>
          <p className="text-xs text-[#64748b] mb-4 leading-relaxed">
            用文字记录生活，在平凡日子里寻找光亮。
          </p>

          {/* 统计数据 */}
          <div className="grid grid-cols-3 gap-2 py-3 border-t border-[#e2e8f0]">
            <div>
              <p className="text-lg font-bold text-foreground">{articleCount}</p>
              <p className="text-xs text-[#64748b]">文章</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{categories.length}</p>
              <p className="text-xs text-[#64748b]">分类</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">12</p>
              <p className="text-xs text-[#64748b]">标签</p>
            </div>
          </div>
        </div>

        {/* 分类列表 */}
        <div className="rounded-xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
            <FolderOpen className="w-4 h-4 text-[#3b82f6]" />
            文章分类
          </h4>
          <div className="space-y-1.5">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/?category=${cat.id}`}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[#475569] hover:text-foreground hover:bg-[#f1f5f9] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5" />
                    {cat.name}
                  </span>
                  <Badge variant="outline" className="text-xs border-[#e2e8f0] text-[#64748b]">
                    {cat.articleCount}
                  </Badge>
                </Link>
              ))
            ) : (
              <p className="text-xs text-[#64748b] py-2">暂无分类</p>
            )}
          </div>
        </div>

        {/* 标签云 */}
        <div className="rounded-xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
            <Tag className="w-4 h-4 text-[#3b82f6]" />
            热门标签
          </h4>
          <div className="flex flex-wrap gap-2">
            {['生活', '随笔', '阅读', '旅行', '摄影', '美食', '音乐', '思考'].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs text-[#475569] rounded-md border border-[#e2e8f0] hover:border-[#3b82f6]/40 hover:text-[#3b82f6] cursor-pointer transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
