import {message} from "antd";
import mittBus from "@/utils/mittBus";
import * as userApi from "@/services/api/user";

// 请求 - 创建用户
export const create = (record: APIS.IUserCreateReq) => {
  return userApi
    .create(record)
    .then(() => {
      message.success('新增用户成功')
      mittBus.emit('page:crud-dialog:close')
      mittBus.emit('page:main-table:reload')
    })
    .catch(err => {
      console.log(err)
    })
}

// 删除用户
export const remove = (roleId: string) => {
  return userApi
    .removeById(roleId)
    .then(() => {
      message.success('删除用户成功')
      mittBus.emit('page:main-table:reload')
    })
    .catch(err => {
      console.log(err)
    })
}


// 请求 - 更新用户
export const update = (record: APIS.IUserCreateReq) => {
  return userApi
    .updateById(record)
    .then(() => {
      message.success('更新用户成功')
      mittBus.emit('page:crud-dialog:close')
      mittBus.emit('page:main-table:reload')
    })
    .catch(err => {
      console.log(err)
    })
}

// 获取用户分页
export const getPage = (params: any): any => {
  return userApi
    .getPage({
      ...params,
      status: parseInt(params.status),
      pageNo: params.current,
      pageSize: params.pageSize
    })
    .then((roleGetPageRes: APIS.IRoleGetPageRes) => ({
      data: roleGetPageRes.records,
      total: roleGetPageRes.total,
      success: true
    }))
}
