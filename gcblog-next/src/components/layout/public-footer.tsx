/** 前台底部（浅色风格） */
export function PublicFooter() {
  return (
    <footer className="border-t border-[#e2e8f0] bg-white py-8 text-center">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-sm text-[#64748b]">
          GCBlog &copy; {new Date().getFullYear()} · 记录生活，分享热爱
        </p>
        <p className="mt-2 text-xs text-[#94a3b8]">
          文字是时光的礼物，愿每一篇都能与你共鸣
        </p>
      </div>
    </footer>
  )
}
