import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '博客',
  description: 'GCBlog 技术博客，分享开发经验与技术见解',
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
