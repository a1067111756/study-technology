/* 菜单相关 */
import request from '@/utils/request'

// 创建
export async function create(menu: MODEL.IMenu) {
  return request('/api/menu/create', {
    method: 'POST',
    data: menu
  })
}

// 删除
export async function removeById(id: string) {
  return request('/api/menu/removeById', {
    method: 'POST',
    data: { id }
  })
}

// 更新
export async function updateById(menu: MODEL.IMenu) {
  return request('/api/menu/updateById', {
    method: 'POST',
    data: menu
  })
}

// 树形
export async function getTree(id?: string) {
  return request<MODEL.IMenu[]>('/api/menu/getTree', {
    method: 'POST',
    data: { id }
  })
}

