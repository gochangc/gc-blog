// 后台通用表格 Hook（数据加载、分页、CRUD 操作）

'use client'

import { useState, useEffect, useCallback } from 'react'

interface UseAdminTableOptions<T, FormData> {
  /** 获取列表数据 */
  fetchList: () => Promise<T[]>
  /** 删除数据 */
  deleteItem?: (id: number) => Promise<void>
  /** 创建数据 */
  createItem?: (data: FormData) => Promise<void>
  /** 更新数据 */
  updateItem?: (id: number, data: FormData) => Promise<void>
}

interface UseAdminTableReturn<T, FormData> {
  /** 列表数据 */
  data: T[]
  /** 是否加载中 */
  loading: boolean
  /** 删除确认弹窗状态 */
  deleteId: number | null
  /** 编辑弹窗状态 */
  editItem: T | null
  /** 新建/编辑弹窗是否打开 */
  formOpen: boolean

  /** 刷新数据 */
  refresh: () => Promise<void>
  /** 打开新建表单 */
  openCreate: () => void
  /** 打开编辑表单 */
  openEdit: (item: T) => void
  /** 关闭表单 */
  closeForm: () => void
  /** 提交表单 */
  submitForm: (data: FormData) => Promise<void>
  /** 打开删除确认 */
  openDelete: (id: number) => void
  /** 关闭删除确认 */
  closeDelete: () => void
  /** 确认删除 */
  confirmDelete: () => Promise<void>
}

export function useAdminTable<T extends { id: number }, FormData>({
  fetchList,
  deleteItem,
  createItem,
  updateItem,
}: UseAdminTableOptions<T, FormData>): UseAdminTableReturn<T, FormData> {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [editItem, setEditItem] = useState<T | null>(null)
  const [formOpen, setFormOpen] = useState(false)

  /** 加载数据 */
  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const list = await fetchList()
      setData(list)
    } catch {
      // 错误已由 apiClient 统一处理
    } finally {
      setLoading(false)
    }
  }, [fetchList])

  /** 初始加载 */
  useEffect(() => {
    refresh()
  }, [refresh])

  /** 打开新建表单 */
  const openCreate = useCallback(() => {
    setEditItem(null)
    setFormOpen(true)
  }, [])

  /** 打开编辑表单 */
  const openEdit = useCallback((item: T) => {
    setEditItem(item)
    setFormOpen(true)
  }, [])

  /** 关闭表单 */
  const closeForm = useCallback(() => {
    setFormOpen(false)
    setEditItem(null)
  }, [])

  /** 提交表单 */
  const submitForm = useCallback(
    async (data: FormData) => {
      if (editItem) {
        await updateItem?.(editItem.id, data)
      } else {
        await createItem?.(data)
      }
      closeForm()
      await refresh()
    },
    [editItem, updateItem, createItem, closeForm, refresh],
  )

  /** 打开删除确认 */
  const openDelete = useCallback((id: number) => {
    setDeleteId(id)
  }, [])

  /** 关闭删除确认 */
  const closeDelete = useCallback(() => {
    setDeleteId(null)
  }, [])

  /** 确认删除 */
  const confirmDelete = useCallback(async () => {
    if (deleteId === null) return
    await deleteItem?.(deleteId)
    setDeleteId(null)
    await refresh()
  }, [deleteId, deleteItem, refresh])

  return {
    data,
    loading,
    deleteId,
    editItem,
    formOpen,
    refresh,
    openCreate,
    openEdit,
    closeForm,
    submitForm,
    openDelete,
    closeDelete,
    confirmDelete,
  }
}
