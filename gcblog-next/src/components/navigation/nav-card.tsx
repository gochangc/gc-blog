import { ExternalLink, Eye } from 'lucide-react'
import type { NavLink } from '@/lib/types/navigation'

interface NavCardProps {
  link: NavLink
}

/** 导航链接卡片（浅色主题 + 悬停动效） */
export function NavCard({ link }: NavCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group rounded-xl border border-[#e2e8f0] bg-white p-4 hover:border-[#3b82f6]/40 hover:bg-[#f8fafc] hover:-translate-y-1 hover:shadow-md transition-all duration-300 shadow-sm"
    >
      <div className="flex items-start gap-3">
        {/* 图标 */}
        <div className="w-10 h-10 rounded-lg bg-[#eff6ff] flex items-center justify-center shrink-0 group-hover:bg-[#dbeafe] group-hover:scale-110 transition-all duration-300">
          {link.icon ? (
            <img src={link.icon} alt={link.name} className="w-5 h-5 rounded" />
          ) : (
            <ExternalLink className="w-4 h-4 text-[#3b82f6]" />
          )}
        </div>

        {/* 内容 */}
        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-sm text-foreground group-hover:text-[#3b82f6] transition-colors truncate">
            {link.name}
          </h3>
          {link.description && (
            <p className="text-xs text-[#64748b] line-clamp-2 mt-1 leading-relaxed">
              {link.description}
            </p>
          )}
          {link.clickCount !== undefined && (
            <span className="flex items-center gap-1 text-xs text-[#94a3b8] mt-1.5">
              <Eye className="w-3 h-3" />
              {link.clickCount}
            </span>
          )}
        </div>
      </div>
    </a>
  )
}
