/** 前台底部 */
export function PublicFooter() {
  return (
    <footer className="border-t border-gray-200 py-6 text-center text-sm text-[#94a3b8]">
      <p>
        GCBlog &copy; {new Date().getFullYear()} &middot; 基于 Spring Cloud 微服务架构
      </p>
      <p className="mt-1">
        Next.js &middot; React &middot; Tailwind CSS &middot; Spring Boot
      </p>
    </footer>
  )
}
