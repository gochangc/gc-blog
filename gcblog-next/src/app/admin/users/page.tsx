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
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useAdminTable } from '@/hooks/use-admin-table'
import { getUserApi, createUserApi, updateUserApi, deleteUserApi } from '@/lib/api/user'
import type { UserInfo, UserFormData } from '@/lib/types/user'

/** 用户管理页面（深色主题） */
export default function AdminUsersPage() {
  const {
    data: users, loading, deleteId, editItem, formOpen,
    openCreate, openEdit, closeForm, submitForm,
    openDelete, closeDelete, confirmDelete,
  } = useAdminTable<UserInfo, UserFormData>({
    fetchList: async () => {
      try {
        return await getUserApi(0) as unknown as UserInfo[]
      } catch {
        return []
      }
    },
    deleteItem: deleteUserApi,
    createItem: createUserApi,
    updateItem: (id, data) => updateUserApi(id, data),
  })

  const [form, setForm] = useState<UserFormData>({ username: '', password: '', nickname: '', email: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleOpenCreate = () => {
    setForm({ username: '', password: '', nickname: '', email: '' })
    openCreate()
  }

  const handleOpenEdit = (item: UserInfo) => {
    setForm({ username: item.username, nickname: item.nickname, email: item.email })
    openEdit(item)
  }

  const handleSubmit = async () => {
    if (!form.username.trim()) {
      toast.error('请输入用户名')
      return
    }
    if (!editItem && !form.password?.trim()) {
      toast.error('请输入密码')
      return
    }
    setSubmitting(true)
    try {
      await submitForm(form)
      toast.success(editItem ? '用户更新成功' : '用户创建成功')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : '操作失败')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    try {
      await confirmDelete()
      toast.success('用户删除成功')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : '删除失败')
    }
  }

  const inputClass = 'bg-white/5 border-white/10 text-foreground placeholder:text-[#475569] focus:border-[#3b82f6]/50'

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">用户管理</h1>
        <Button onClick={handleOpenCreate} className="bg-[#3b82f6] hover:bg-[#2563eb]">
          <Plus className="w-4 h-4 mr-2" />
          新建用户
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
                <TableHead className="text-[#94a3b8]">用户名</TableHead>
                <TableHead className="text-[#94a3b8]">昵称</TableHead>
                <TableHead className="text-[#94a3b8]">邮箱</TableHead>
                <TableHead className="text-[#94a3b8]">角色</TableHead>
                <TableHead className="text-[#94a3b8] text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow className="border-white/8">
                  <TableCell colSpan={5} className="text-center py-8 text-[#64748b]">暂无用户数据</TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id} className="border-white/8 hover:bg-white/[0.02]">
                    <TableCell className="font-medium text-foreground">{user.username}</TableCell>
                    <TableCell className="text-[#94a3b8]">{user.nickname || '-'}</TableCell>
                    <TableCell className="text-[#94a3b8]">{user.email || '-'}</TableCell>
                    <TableCell>
                      {user.roles?.map((role) => (
                        <Badge key={role} variant="outline" className="mr-1 border-white/10 text-[#94a3b8]">
                          {role.replace('ROLE_', '')}
                        </Badge>
                      ))}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleOpenEdit(user)} className="text-[#94a3b8] hover:text-foreground hover:bg-white/5">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openDelete(user.id)} className="text-[#ef4444] hover:bg-[#ef4444]/10">
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
            <DialogTitle className="text-foreground">{editItem ? '编辑用户' : '新建用户'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-[#94a3b8]">用户名</Label>
              <Input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="请输入用户名" disabled={!!editItem} className={inputClass} />
            </div>
            {!editItem && (
              <div className="space-y-2">
                <Label className="text-[#94a3b8]">密码</Label>
                <Input type="password" value={form.password || ''} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="请输入密码" className={inputClass} />
              </div>
            )}
            <div className="space-y-2">
              <Label className="text-[#94a3b8]">昵称</Label>
              <Input value={form.nickname || ''} onChange={(e) => setForm({ ...form, nickname: e.target.value })} placeholder="请输入昵称" className={inputClass} />
            </div>
            <div className="space-y-2">
              <Label className="text-[#94a3b8]">邮箱</Label>
              <Input type="email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="请输入邮箱" className={inputClass} />
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
            <AlertDialogDescription className="text-[#94a3b8]">删除后不可恢复，确定要删除该用户吗？</AlertDialogDescription>
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
