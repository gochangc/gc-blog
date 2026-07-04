'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// 注册 GSAP 插件
gsap.registerPlugin(ScrollTrigger)

interface AnimatedStaggerProps {
  children: React.ReactNode
  className?: string
  itemSelector: string
  stagger?: number
  delay?: number
}

/** 对子元素进行交错滚动入场动画的包装组件 */
export function AnimatedStagger({
  children,
  className = '',
  itemSelector,
  stagger = 0.1,
  delay = 0,
}: AnimatedStaggerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion || !ref.current) return

      const items = ref.current.querySelectorAll(itemSelector)
      if (!items.length) return

      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay,
          stagger,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
