'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react'
import { useAdminTable } from '@/hooks/use-admin-table'
import {
  getNavLinksApi, createNavLinkApi, updateNavLinkApi, deleteNavLinkApi, getNavCategoriesApi,
} from '@/lib/api/navigation'
import type { NavLink, NavLinkFormData, NavCategory } from '@/lib/types/navigation'

/** 导航链接管理页面（深色主题） */
export default function AdminNavLinksPage() {
  const {
    data: links, loading, deleteId, editItem, formOpen,
    openCreate, openEdit, closeForm, submitForm,
    openDelete, closeDelete, confirmDelete,
  } = useAdminTable<NavLink, NavLinkFormData>({
    fetchList: getNavLinksApi,
    deleteItem: deleteNavLinkApi,
    createItem: createNavLinkApi,
    updateItem: updateNavLinkApi,
  })

  const [form, setForm] = useState<NavLinkFormData>({ categoryId: 0, name: '', url: '' })
  const [submitting, setSubmitting] = useState(false)
  const [categories, setCategories] = useState<NavCategory[]>([])

  useEffect(() => {
    getNavCategoriesApi().then(setCategories).catch(() => {})
  }, [])

  const handleOpenCreate = () => {
    setForm({ categoryId: 0, name: '', url: '', description: '', icon: '', sortOrder: 0 })
    openCreate()
  }

  const handleOpenEdit = (item: NavLink) => {
    setForm({
      categoryId: item.categoryId,
      name: item.name,
      url: item.url,
      description: item.description,
      icon: item.icon,
      sortOrder: item.sortOrder,
    })
    openEdit(item)
  }

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.url.trim()) {
      toast.error('请输入链接名称和 URL')
      return
    }
    if (!form.categoryId) {
      toast.error('请选择所属分类')
      return
    }
    setSubmitting(true)
    try {
      await submitForm(form)
      toast.success(editItem ? '链接更新成功' : '链接创建成功')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : '操作失败')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    try {
      await confirmDelete()
      toast.success('链接删除成功')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : '删除失败')
    }
  }

  const getCategoryName = (categoryId: number) => {
    return categories.find((c) => c.id === categoryId)?.name || '-'
  }

  const inputClass = 'bg-white/5 border-white/10 text-foreground placeholder:text-[#475569] focus:border-[#3b82f6]/50'

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">导航链接管理</h1>
        <Button onClick={handleOpenCreate} className="bg-[#3b82f6] hover:bg-[#2563eb]">
          <Plus className="w-4 h-4 mr-2" />
          新建链接
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
                <TableHead className="text-[#94a3b8]">URL</TableHead>
                <TableHead className="text-[#94a3b8]">分类</TableHead>
                <TableHead className="text-[#94a3b8]">点击量</TableHead>
                <TableHead className="text-[#94a3b8] text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {links.length === 0 ? (
                <TableRow className="border-white/8">
                  <TableCell colSpan={5} className="text-center py-8 text-[#64748b]">暂无链接数据</TableCell>
                </TableRow>
              ) : (
                links.map((link) => (
                  <TableRow key={link.id} className="border-white/8 hover:bg-white/[0.02]">
                    <TableCell className="font-medium text-foreground">{link.name}</TableCell>
                    <TableCell>
                      <a href={link.url} target="_blank" rel="noopener noreferrer"
                        className="text-[#3b82f6] hover:underline flex items-center gap-1 max-w-[200px] truncate">
                        {link.url}
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </TableCell>
                    <TableCell className="text-[#94a3b8]">{getCategoryName(link.categoryId)}</TableCell>
                    <TableCell className="text-[#94a3b8]">{link.clickCount}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleOpenEdit(link)} className="text-[#94a3b8] hover:text-foreground hover:bg-white/5">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openDelete(link.id)} className="text-[#ef4444] hover:bg-[#ef4444]/10">
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
            <DialogTitle className="text-foreground">{editItem ? '编辑链接' : '新建链接'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-[#94a3b8]">所属分类</Label>
              <Select value={form.categoryId ? String(form.categoryId) : ''} onValueChange={(val) => setForm({ ...form, categoryId: Number(val) })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-foreground">
                  <SelectValue placeholder="请选择分类" />
                </SelectTrigger>
                <SelectContent className="bg-[#1e293b] border-white/10">
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)} className="focus:bg-white/10">{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[#94a3b8]">链接名称</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="请输入链接名称" className={inputClass} />
            </div>
            <div className="space-y-2">
              <Label className="text-[#94a3b8]">URL</Label>
              <Input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://example.com" className={inputClass} />
            </div>
            <div className="space-y-2">
              <Label className="text-[#94a3b8]">描述</Label>
              <Textarea value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="请输入链接描述" rows={2} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[#94a3b8]">图标 URL</Label>
                <Input value={form.icon || ''} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="可选" className={inputClass} />
              </div>
              <div className="space-y-2">
                <Label className="text-[#94a3b8]">排序</Label>
                <Input type="number" value={form.sortOrder ?? 0} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} className={inputClass} />
              </div>
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
            <AlertDialogDescription className="text-[#94a3b8]">删除后不可恢复，确定要删除该链接吗？</AlertDialogDescription>
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
