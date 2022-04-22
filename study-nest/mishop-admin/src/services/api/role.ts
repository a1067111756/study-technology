/* 角色相关 */
import request from '@/utils/request'

// 创建
export async function create(roleCreateReq: APIS.IRoleCreateReq) {
  return request('/api/role/create', {
    method: 'POST',
    data: roleCreateReq
  })
}

// 删除
export async function removeById(id: string) {
  return request('/api/role/removeById', {
    method: 'POST',
    data: {
      id
    }
  })
}

// 更新
export async function updateById(role: APIS.IRoleUpdateReq) {
  return request('/api/role/updateById', {
    method: 'POST',
    data: role
  })
}

// 分页
export async function getPage(roleGetPageReq: APIS.IRoleGetPageReq) {
  return request<APIS.IRoleGetPageRes>('/api/role/getPage', {
    method: 'POST',
    data: roleGetPageReq
  })
}

// 列表
export async function getList() {
  return request<MODEL.IRole[]>('/api/role/getList', {
    method: 'POST'
  })
}
