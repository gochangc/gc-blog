'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

interface MarkdownRendererProps {
  content: string
}

/** Markdown 渲染器（用于文章阅读页） */
export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="article-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
