'use client'

import dynamic from 'next/dynamic'

// 动态导入 Markdown 编辑器（仅客户端加载）
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  height?: number
}

/** Markdown 编辑器封装 */
export function MarkdownEditor({ value, onChange, height = 400 }: MarkdownEditorProps) {
  return (
    <div data-color-mode="light">
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || '')}
        height={height}
        preview="live"
      />
    </div>
  )
}
