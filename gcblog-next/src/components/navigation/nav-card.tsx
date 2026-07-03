import { Card, CardContent } from '@/components/ui/card'
import { ExternalLink, Eye } from 'lucide-react'
import type { NavLink } from '@/lib/types/navigation'

interface NavCardProps {
  link: NavLink
}

/** 导航链接卡片 */
export function NavCard({ link }: NavCardProps) {
  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer">
      <Card className="h-full hover:shadow-lg hover:border-[#6366f1]/30 transition-all duration-200 cursor-pointer group">
        <CardContent className="p-4 flex items-start gap-3">
          {/* 图标 */}
          <div className="w-10 h-10 rounded-lg bg-[#6366f1]/10 flex items-center justify-center shrink-0">
            {link.icon ? (
              <img src={link.icon} alt={link.name} className="w-6 h-6 rounded" />
            ) : (
              <ExternalLink className="w-5 h-5 text-[#6366f1]" />
            )}
          </div>

          {/* 内容 */}
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-sm text-[#1e293b] group-hover:text-[#6366f1] transition-colors truncate">
              {link.name}
            </h3>
            {link.description && (
              <p className="text-xs text-[#94a3b8] line-clamp-2 mt-1">
                {link.description}
              </p>
            )}
            {link.clickCount !== undefined && (
              <span className="flex items-center gap-1 text-xs text-[#94a3b8] mt-1">
                <Eye className="w-3 h-3" />
                {link.clickCount}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </a>
  )
}
