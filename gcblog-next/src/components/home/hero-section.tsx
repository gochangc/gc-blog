'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

/** 首页 Hero 区域 */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1e1b4b] via-[#6366f1] to-[#8b5cf6] py-24 px-6">
      {/* 装饰背景 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          探索技术，记录成长
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          基于 Spring Cloud 微服务架构的个人博客与导航平台，分享技术见解与实用工具
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/blog">
            <Button size="lg" className="bg-white text-[#6366f1] hover:bg-white/90 font-semibold px-8">
              阅读博客
            </Button>
          </Link>
          <Link href="/navigation">
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
              实用导航
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
