/* 用户相关 */
import request from '@/utils/request'

// 创建
export async function create(userCreateReq: APIS.IUserCreateReq) {
  return request('/api/user/create', {
    method: 'POST',
    data: userCreateReq
  })
}

// 删除
export async function removeById(id: string) {
  return request('/api/user/removeById', {
    method: 'POST',
    data: {
      id
    }
  })
}

// 更新
export async function updateById(user: MODEL.IUser) {
  return request('/api/user/updateById', {
    method: 'POST',
    data: user
  })
}

// 分页
export async function getPage(roleGetPageReq: APIS.IRoleGetPageReq) {
  return request<APIS.IRoleGetPageRes>('/api/user/getPage', {
    method: 'POST',
    data: roleGetPageReq
  })
}
