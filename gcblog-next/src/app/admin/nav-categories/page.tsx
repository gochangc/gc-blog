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
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useAdminTable } from '@/hooks/use-admin-table'
import {
  getNavCategoriesApi, createNavCategoryApi, updateNavCategoryApi, deleteNavCategoryApi,
} from '@/lib/api/navigation'
import type { NavCategory, NavCategoryFormData } from '@/lib/types/navigation'

/** 导航分类管理页面（深色主题） */
export default function AdminNavCategoriesPage() {
  const {
    data: categories, loading, deleteId, editItem, formOpen,
    openCreate, openEdit, closeForm, submitForm,
    openDelete, closeDelete, confirmDelete,
  } = useAdminTable<NavCategory, NavCategoryFormData>({
    fetchList: getNavCategoriesApi,
    deleteItem: deleteNavCategoryApi,
    createItem: createNavCategoryApi,
    updateItem: updateNavCategoryApi,
  })

  const [form, setForm] = useState<NavCategoryFormData>({ name: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleOpenCreate = () => {
    setForm({ name: '', icon: '', sortOrder: 0 })
    openCreate()
  }

  const handleOpenEdit = (item: NavCategory) => {
    setForm({ name: item.name, icon: item.icon, sortOrder: item.sortOrder })
    openEdit(item)
  }

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      toast.error('请输入分类名称')
      return
    }
    setSubmitting(true)
    try {
      await submitForm(form)
      toast.success(editItem ? '分类更新成功' : '分类创建成功')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : '操作失败')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    try {
      await confirmDelete()
      toast.success('分类删除成功')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : '删除失败')
    }
  }

  const inputClass = 'bg-white/5 border-white/10 text-foreground placeholder:text-[#475569] focus:border-[#3b82f6]/50'

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">导航分类管理</h1>
        <Button onClick={handleOpenCreate} className="bg-[#3b82f6] hover:bg-[#2563eb]">
          <Plus className="w-4 h-4 mr-2" />
          新建分类
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
                <TableHead className="text-[#94a3b8]">名称</TableHead>
                <TableHead className="text-[#94a3b8]">排序</TableHead>
                <TableHead className="text-[#94a3b8]">链接数</TableHead>
                <TableHead className="text-[#94a3b8] text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow className="border-white/8">
                  <TableCell colSpan={4} className="text-center py-8 text-[#64748b]">暂无分类数据</TableCell>
                </TableRow>
              ) : (
                categories.map((cat) => (
                  <TableRow key={cat.id} className="border-white/8 hover:bg-white/[0.02]">
                    <TableCell className="font-medium text-foreground">{cat.name}</TableCell>
                    <TableCell className="text-[#94a3b8]">{cat.sortOrder}</TableCell>
                    <TableCell className="text-[#94a3b8]">{cat.links?.length ?? 0}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleOpenEdit(cat)} className="text-[#94a3b8] hover:text-foreground hover:bg-white/5">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openDelete(cat.id)} className="text-[#ef4444] hover:bg-[#ef4444]/10">
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
            <DialogTitle className="text-foreground">{editItem ? '编辑分类' : '新建分类'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-[#94a3b8]">分类名称</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="请输入分类名称" className={inputClass} />
            </div>
            <div className="space-y-2">
              <Label className="text-[#94a3b8]">图标 URL</Label>
              <Input value={form.icon || ''} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="请输入图标地址（可选）" className={inputClass} />
            </div>
            <div className="space-y-2">
              <Label className="text-[#94a3b8]">排序</Label>
              <Input type="number" value={form.sortOrder ?? 0} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} className={inputClass} />
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
            <AlertDialogDescription className="text-[#94a3b8]">删除分类将同时删除其下所有链接，确定要删除吗？</AlertDialogDescription>
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
