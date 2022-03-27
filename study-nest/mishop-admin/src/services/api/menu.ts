/* 菜单相关 */
import request from '@/utils/request'

// 创建
export async function create(menuCreateReq: APIS.IMenuCreateReq) {
  return request('/api/menu/create', {
    method: 'POST',
    data: menuCreateReq
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
export async function updateById(menuUpdateReq: APIS.IMenuUpdateReq) {
  return request('/api/menu/updateById', {
    method: 'POST',
    data: menuUpdateReq
  })
}

// 树形
export async function getTree(id?: string) {
  return request<MODEL.IMenu[]>('/api/menu/getTree', {
    method: 'POST',
    data: { id }
  })
}

