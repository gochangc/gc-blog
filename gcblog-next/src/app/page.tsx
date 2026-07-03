import { HeroSection } from '@/components/home/hero-section'
import { RecentArticles } from '@/components/home/recent-articles'
import { Marquee } from '@/components/ui/marquee'
import { NumberTicker } from '@/components/ui/number-ticker'
import { BlurFade } from '@/components/ui/blur-fade'
import type { Article } from '@/lib/types/blog'

/** 首页（SSR，深色主题 + Magic UI 动画） */
export default async function HomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'

  let articles: Article[] = []
  try {
    const res = await fetch(`${baseUrl}/blog/articles?current=1&size=6`, {
      next: { revalidate: 60 },
    })
    if (res.ok) {
      const body = await res.json()
      articles = Array.isArray(body) ? body : body.data || []
    }
  } catch {
    // 获取文章失败时显示空状态
  }

  return (
    <div>
      <HeroSection />

      {/* 统计数据条 */}
      <section className="border-y border-white/6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: '技术文章', value: 128, suffix: '+' },
            { label: '导航链接', value: 256, suffix: '+' },
            { label: '技术分类', value: 12, suffix: '' },
            { label: '访问次数', value: 10000, suffix: '+' },
          ].map((stat, i) => (
            <BlurFade key={stat.label} delay={0.1 + i * 0.1} inView>
              <div className="text-center">
                <div className="flex items-baseline justify-center gap-0.5">
                  <NumberTicker
                    value={stat.value}
                    className="text-3xl md:text-4xl font-bold text-gradient-blue"
                  />
                  {stat.suffix && (
                    <span className="text-xl text-[#3b82f6]">{stat.suffix}</span>
                  )}
                </div>
                <p className="text-sm text-[#64748b] mt-2">{stat.label}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* 技术栈跑马灯 */}
      <section className="py-10 overflow-hidden">
        <Marquee className="[--duration:30s]" pauseOnHover>
          {['Spring Boot', 'Spring Cloud', 'Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Docker', 'Redis', 'MySQL', 'Nacos', 'shadcn/ui', 'GSAP'].map((tech) => (
            <span
              key={tech}
              className="mx-4 px-4 py-2 rounded-lg border border-white/8 bg-white/[0.03] text-sm text-[#94a3b8] whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
        </Marquee>
      </section>

      {/* 最新文章 */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <BlurFade delay={0.1} inView>
          <h2 className="text-2xl font-bold text-foreground mb-2">最新文章</h2>
          <p className="text-[#64748b] text-sm mb-8">探索最新的技术见解与分享</p>
        </BlurFade>
        <RecentArticles articles={articles} />
      </section>
    </div>
  )
}
