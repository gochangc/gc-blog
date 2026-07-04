'use client'

import { Typewriter } from '@/components/ui/typewriter'

/** 打字机 Hero 区域（浅色渐变背景 + 打字机效果） */
export function TypewriterHero() {
  return (
    <section className="relative overflow-hidden">
      {/* 渐变背景 */}
      <div className="absolute inset-0 gradient-brand" />
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-[#3b82f6]/8 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#6366f1]/6 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-28 sm:py-36 text-center">
        {/* 打字机文字 */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-relaxed mb-6 min-h-[2.5em]">
          <Typewriter
            texts={[
              '生活是一本值得慢慢读的书，每一页都藏着不期而遇的温柔。',
              '且将新火试新茶，诗酒趁年华。',
              '心有山海，静而不争。',
              '愿我们在文字里相遇，在时光中同行。',
            ]}
            typingSpeed={100}
            deletingSpeed={60}
            pauseDuration={3000}
          />
        </h1>

        {/* 副标题 */}
        <p className="text-sm sm:text-base text-[#64748b] leading-relaxed">
          一方小小天地，记录生活、思考与热爱
        </p>
      </div>

      {/* 底部渐变遮罩 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f8fafc] to-transparent" />
    </section>
  )
}
