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

/** 文章管理列表页面 */
export default function AdminArticlesPage() {
  const {
    data: articles, loading, deleteId,
    openDelete, closeDelete, confirmDelete, refresh,
  } = useAdminTable<Article, ArticleFormData>({
    fetchList: () => getArticlesApi({ current: 1, size: 100 }),
    deleteItem: deleteArticleApi,
  })

  /** 发布文章 */
  const handlePublish = async (id: number) => {
    try {
      await publishArticleApi(id)
      toast.success('文章发布成功')
      await refresh()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : '发布失败')
    }
  }

  /** 删除文章 */
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
        <h1 className="text-2xl font-bold text-[#1e293b]">文章管理</h1>
        <Link href="/admin/articles/new">
          <Button className="bg-[#6366f1] hover:bg-[#4f46e5]">
            <Plus className="w-4 h-4 mr-2" />
            新建文章
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>标题</TableHead>
                <TableHead>分类</TableHead>
                <TableHead>标签</TableHead>
                <TableHead>浏览量</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-[#94a3b8]">
                    暂无文章数据
                  </TableCell>
                </TableRow>
              ) : (
                articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium max-w-[300px] truncate">
                      {article.title}
                    </TableCell>
                    <TableCell>
                      {article.categoryName ? (
                        <Badge variant="secondary" className="bg-[#6366f1]/10 text-[#6366f1]">
                          {article.categoryName}
                        </Badge>
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {article.tagNames?.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{article.viewCount}</TableCell>
                    <TableCell className="text-[#94a3b8] text-sm">
                      {article.createTime?.slice(0, 10)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/blog/${article.id}`} target="_blank">
                          <Button variant="ghost" size="sm" title="预览">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" onClick={() => handlePublish(article.id)} title="发布">
                          <Send className="w-4 h-4 text-[#22c55e]" />
                        </Button>
                        <Link href={`/admin/articles/${article.id}/edit`}>
                          <Button variant="ghost" size="sm" title="编辑">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" onClick={() => openDelete(article.id)} className="text-red-600" title="删除">
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              删除后不可恢复，确定要删除该文章吗？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              确认删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
