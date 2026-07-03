'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2 } from 'lucide-react'
import { useAdminTable } from '@/hooks/use-admin-table'
import { getTagsApi, createTagApi, deleteTagApi } from '@/lib/api/blog'
import type { Tag, TagFormData } from '@/lib/types/blog'

/** 标签管理页面 */
export default function AdminTagsPage() {
  const {
    data: tags, loading, deleteId, formOpen,
    openCreate, closeForm, submitForm,
    openDelete, closeDelete, confirmDelete,
  } = useAdminTable<Tag, TagFormData>({
    fetchList: getTagsApi,
    deleteItem: deleteTagApi,
    createItem: createTagApi,
  })

  const [form, setForm] = useState<TagFormData>({ name: '', slug: '', color: '#6366f1' })
  const [submitting, setSubmitting] = useState(false)

  const handleOpenCreate = () => {
    setForm({ name: '', slug: '', color: '#6366f1' })
    openCreate()
  }

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      toast.error('请输入标签名称')
      return
    }
    setSubmitting(true)
    try {
      await submitForm(form)
      toast.success('标签创建成功')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : '操作失败')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    try {
      await confirmDelete()
      toast.success('标签删除成功')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : '删除失败')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1e293b]">标签管理</h1>
        <Button onClick={handleOpenCreate} className="bg-[#6366f1] hover:bg-[#4f46e5]">
          <Plus className="w-4 h-4 mr-2" />
          新建标签
        </Button>
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
                <TableHead>标签名</TableHead>
                <TableHead>标识</TableHead>
                <TableHead>颜色</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tags.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-[#94a3b8]">
                    暂无标签数据
                  </TableCell>
                </TableRow>
              ) : (
                tags.map((tag) => (
                  <TableRow key={tag.id}>
                    <TableCell>
                      <Badge style={{ backgroundColor: tag.color || '#6366f1', color: '#fff' }}>
                        {tag.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[#475569]">{tag.slug}</TableCell>
                    <TableCell>
                      <span className="inline-block w-6 h-6 rounded border" style={{ backgroundColor: tag.color || '#6366f1' }} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openDelete(tag.id)} className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* 新建标签弹窗 */}
      <Dialog open={formOpen} onOpenChange={(open) => !open && closeForm()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新建标签</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>标签名称</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="请输入标签名称"
              />
            </div>
            <div className="space-y-2">
              <Label>标识（slug）</Label>
              <Input
                value={form.slug || ''}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="例如：javascript"
              />
            </div>
            <div className="space-y-2">
              <Label>颜色</Label>
              <Input
                type="color"
                value={form.color || '#6366f1'}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="h-10 w-20"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeForm}>取消</Button>
            <Button onClick={handleSubmit} disabled={submitting} className="bg-[#6366f1] hover:bg-[#4f46e5]">
              {submitting ? '提交中...' : '确认'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除确认弹窗 */}
      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && closeDelete()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              删除后不可恢复，确定要删除该标签吗？
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
