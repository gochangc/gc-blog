import { ExternalLink, Eye } from 'lucide-react'
import type { NavLink } from '@/lib/types/navigation'

interface NavCardProps {
  link: NavLink
}

/** 导航链接卡片（深色主题） */
export function NavCard({ link }: NavCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group rounded-xl border border-white/8 bg-white/[0.02] p-4 hover:border-[#3b82f6]/30 hover:bg-white/[0.04] transition-all duration-300"
    >
      <div className="flex items-start gap-3">
        {/* 图标 */}
        <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center shrink-0 group-hover:bg-[#3b82f6]/20 transition-colors">
          {link.icon ? (
            <img src={link.icon} alt={link.name} className="w-5 h-5 rounded" />
          ) : (
            <ExternalLink className="w-4 h-4 text-[#60a5fa]" />
          )}
        </div>

        {/* 内容 */}
        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-sm text-foreground group-hover:text-[#60a5fa] transition-colors truncate">
            {link.name}
          </h3>
          {link.description && (
            <p className="text-xs text-[#64748b] line-clamp-2 mt-1 leading-relaxed">
              {link.description}
            </p>
          )}
          {link.clickCount !== undefined && (
            <span className="flex items-center gap-1 text-xs text-[#475569] mt-1.5">
              <Eye className="w-3 h-3" />
              {link.clickCount}
            </span>
          )}
        </div>
      </div>
    </a>
  )
}
