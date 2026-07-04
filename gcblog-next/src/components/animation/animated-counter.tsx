'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

interface AnimatedCounterProps {
  value: number
  duration?: number
  className?: string
}

/** 数字递增动画组件 */
export function AnimatedCounter({ value, duration = 1.5, className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayValue, setDisplayValue] = useState(0)

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) {
        setDisplayValue(value)
        return
      }

      const obj = { value: 0 }
      gsap.to(obj, {
        value,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          setDisplayValue(Math.round(obj.value))
        },
      })
    },
    { scope: ref, dependencies: [value] }
  )

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  )
}
