'use client'

import Link from 'next/link'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2, Send, Eye } from 'lucide-react'
import { useAdminTable } from '@/hooks/use-admin-table'
import {
  getArticlesApi, deleteArticleApi, publishArticleApi,
} from '@/lib/api/blog'
import type { Article, ArticleFormData } from '@/lib/types/blog'

/** 文章管理列表页面（深色主题） */
export default function AdminArticlesPage() {
  const {
    data: articles, loading, deleteId,
    openDelete, closeDelete, confirmDelete, refresh,
  } = useAdminTable<Article, ArticleFormData>({
    fetchList: () => getArticlesApi({ current: 1, size: 100 }),
    deleteItem: deleteArticleApi,
  })

  const handlePublish = async (id: number) => {
    try {
      await publishArticleApi(id)
      toast.success('文章发布成功')
      await refresh()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : '发布失败')
    }
  }

  const handleDelete = async () => {
    try {
      await confirmDelete()
      toast.success('文章删除成功')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : '删除失败')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">文章管理</h1>
        <Link href="/admin/articles/new">
          <Button className="bg-[#3b82f6] hover:bg-[#2563eb]">
            <Plus className="w-4 h-4 mr-2" />
            新建文章
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full bg-white/5" />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-white/8 bg-white/[0.02] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/8 hover:bg-transparent">
                <TableHead className="text-[#94a3b8]">标题</TableHead>
                <TableHead className="text-[#94a3b8]">分类</TableHead>
                <TableHead className="text-[#94a3b8]">标签</TableHead>
                <TableHead className="text-[#94a3b8]">浏览量</TableHead>
                <TableHead className="text-[#94a3b8]">创建时间</TableHead>
                <TableHead className="text-[#94a3b8] text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.length === 0 ? (
                <TableRow className="border-white/8">
                  <TableCell colSpan={6} className="text-center py-8 text-[#64748b]">
                    暂无文章数据
                  </TableCell>
                </TableRow>
              ) : (
                articles.map((article) => (
                  <TableRow key={article.id} className="border-white/8 hover:bg-white/[0.02]">
                    <TableCell className="font-medium max-w-[300px] truncate text-foreground">
                      {article.title}
                    </TableCell>
                    <TableCell>
                      {article.categoryName ? (
                        <Badge variant="secondary" className="bg-[#3b82f6]/10 text-[#60a5fa] border-[#3b82f6]/20">
                          {article.categoryName}
                        </Badge>
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {article.tagNames?.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-white/10 text-[#94a3b8]">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-[#94a3b8]">{article.viewCount}</TableCell>
                    <TableCell className="text-[#64748b] text-sm">
                      {article.createTime?.slice(0, 10)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/blog/${article.id}`} target="_blank">
                          <Button variant="ghost" size="sm" title="预览" className="text-[#94a3b8] hover:text-foreground hover:bg-white/5">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" onClick={() => handlePublish(article.id)} title="发布" className="text-[#22c55e] hover:bg-[#22c55e]/10">
                          <Send className="w-4 h-4" />
                        </Button>
                        <Link href={`/admin/articles/${article.id}/edit`}>
                          <Button variant="ghost" size="sm" title="编辑" className="text-[#94a3b8] hover:text-foreground hover:bg-white/5">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" onClick={() => openDelete(article.id)} className="text-[#ef4444] hover:bg-[#ef4444]/10" title="删除">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* 删除确认弹窗 */}
      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && closeDelete()}>
        <AlertDialogContent className="bg-[#1e293b] border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">确认删除</AlertDialogTitle>
            <AlertDialogDescription className="text-[#94a3b8]">
              删除后不可恢复，确定要删除该文章吗？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/10 text-[#94a3b8] hover:bg-white/5">取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-[#ef4444] hover:bg-[#dc2626]">
              确认删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
