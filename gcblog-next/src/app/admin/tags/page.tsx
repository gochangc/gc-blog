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

/** 标签管理页面（深色主题） */
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

  const [form, setForm] = useState<TagFormData>({ name: '', slug: '', color: '#3b82f6' })
  const [submitting, setSubmitting] = useState(false)

  const handleOpenCreate = () => {
    setForm({ name: '', slug: '', color: '#3b82f6' })
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

  const inputClass = 'bg-white/5 border-white/10 text-foreground placeholder:text-[#475569] focus:border-[#3b82f6]/50'

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">标签管理</h1>
        <Button onClick={handleOpenCreate} className="bg-[#3b82f6] hover:bg-[#2563eb]">
          <Plus className="w-4 h-4 mr-2" />
          新建标签
        </Button>
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
                <TableHead className="text-[#94a3b8]">标签名</TableHead>
                <TableHead className="text-[#94a3b8]">标识</TableHead>
                <TableHead className="text-[#94a3b8]">颜色</TableHead>
                <TableHead className="text-[#94a3b8] text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tags.length === 0 ? (
                <TableRow className="border-white/8">
                  <TableCell colSpan={4} className="text-center py-8 text-[#64748b]">暂无标签数据</TableCell>
                </TableRow>
              ) : (
                tags.map((tag) => (
                  <TableRow key={tag.id} className="border-white/8 hover:bg-white/[0.02]">
                    <TableCell>
                      <Badge style={{ backgroundColor: tag.color || '#3b82f6', color: '#fff' }}>{tag.name}</Badge>
                    </TableCell>
                    <TableCell className="text-[#94a3b8]">{tag.slug}</TableCell>
                    <TableCell>
                      <span className="inline-block w-6 h-6 rounded border border-white/10" style={{ backgroundColor: tag.color || '#3b82f6' }} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openDelete(tag.id)} className="text-[#ef4444] hover:bg-[#ef4444]/10">
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

      <Dialog open={formOpen} onOpenChange={(open) => !open && closeForm()}>
        <DialogContent className="bg-[#1e293b] border-white/10">
          <DialogHeader>
            <DialogTitle className="text-foreground">新建标签</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-[#94a3b8]">标签名称</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="请输入标签名称" className={inputClass} />
            </div>
            <div className="space-y-2">
              <Label className="text-[#94a3b8]">标识（slug）</Label>
              <Input value={form.slug || ''} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="例如：javascript" className={inputClass} />
            </div>
            <div className="space-y-2">
              <Label className="text-[#94a3b8]">颜色</Label>
              <Input type="color" value={form.color || '#3b82f6'} onChange={(e) => setForm({ ...form, color: e.target.value })} className="h-10 w-20 bg-transparent border-white/10" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeForm} className="border-white/10 text-[#94a3b8] hover:bg-white/5">取消</Button>
            <Button onClick={handleSubmit} disabled={submitting} className="bg-[#3b82f6] hover:bg-[#2563eb]">
              {submitting ? '提交中...' : '确认'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && closeDelete()}>
        <AlertDialogContent className="bg-[#1e293b] border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">确认删除</AlertDialogTitle>
            <AlertDialogDescription className="text-[#94a3b8]">删除后不可恢复，确定要删除该标签吗？</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/10 text-[#94a3b8] hover:bg-white/5">取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-[#ef4444] hover:bg-[#dc2626]">确认删除</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
