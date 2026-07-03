'use client'

import Link from 'next/link'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { AuroraText } from '@/components/ui/aurora-text'
import { BlurFade } from '@/components/ui/blur-fade'
import { Particles } from '@/components/ui/particles'

/** 首页 Hero 区域（Magic UI + 深色主题） */
export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#0f172a] to-[#0f172a]" />

      {/* 粒子背景 */}
      <Particles
        className="absolute inset-0"
        quantity={80}
        color="#3b82f6"
        size={0.6}
        staticity={30}
        ease={80}
      />

      {/* 装饰光晕 */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#3b82f6]/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#6366f1]/6 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <BlurFade delay={0.1} duration={0.8}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-xs text-[#94a3b8] font-medium">Spring Cloud 微服务架构博客平台</span>
          </div>
        </BlurFade>

        <BlurFade delay={0.2} duration={0.8}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            <AuroraText
              className="font-bold"
              colors={['#3b82f6', '#6366f1', '#059669', '#60a5fa']}
              speed={0.8}
            >
              探索技术
            </AuroraText>
            <br />
            <span className="text-foreground">记录成长</span>
          </h1>
        </BlurFade>

        <BlurFade delay={0.35} duration={0.8}>
          <p className="text-lg md:text-xl text-[#94a3b8] mb-10 max-w-2xl mx-auto leading-relaxed">
            基于 Spring Cloud 微服务架构的个人博客与导航平台，分享技术见解与实用工具
          </p>
        </BlurFade>

        <BlurFade delay={0.5} duration={0.8}>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/blog">
              <ShimmerButton
                className="px-8 py-3 text-sm font-medium"
                shimmerColor="#60a5fa"
                background="rgba(59, 130, 246, 0.9)"
                borderRadius="12px"
              >
                阅读博客
              </ShimmerButton>
            </Link>
            <Link href="/navigation">
              <button className="px-8 py-3 text-sm font-medium text-[#94a3b8] rounded-xl border border-white/10 hover:border-white/20 hover:text-foreground hover:bg-white/5 transition-all duration-200">
                实用导航
              </button>
            </Link>
          </div>
        </BlurFade>
      </div>

      {/* 底部渐变遮罩 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f172a] to-transparent" />
    </section>
  )
}
