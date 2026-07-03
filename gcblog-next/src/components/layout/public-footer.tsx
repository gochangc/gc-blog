/** 前台底部（深色风格） */
export function PublicFooter() {
  return (
    <footer className="border-t border-white/6 py-8 text-center">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-sm text-[#64748b]">
          GCBlog &copy; {new Date().getFullYear()} &middot; 基于 Spring Cloud 微服务架构
        </p>
        <p className="mt-2 text-xs text-[#475569]">
          Next.js &middot; React &middot; Tailwind CSS &middot; Spring Boot
        </p>
      </div>
    </footer>
  )
}
