import * as roleApi from "@/services/api/role";

// 获取角色分页
export const getPage = () => {
  return roleApi
    .getList()
    .then(data => data.map(item => ({
      label: item.name,
      value: item.id
    })))
}
