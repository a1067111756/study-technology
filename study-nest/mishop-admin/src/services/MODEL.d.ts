declare namespace MODEL {
  /* 用户相关 */
  type IUser = {
    id?: string;
    userName: string;
    nickName: string;
    password?: string;
    avatar?: string;
    phone: string;
    address: string
    email: string;
    role: string;
    status: number;
  }

  /* 角色相关 */
  type IRole = {
    id?: string;
    name: string;
    status: number;
    remark: string;
    menuId: string[];
    create_time?: string;
    update_time?: string;
  }

  /* 菜单 */
 type IMenu = {
   // 唯一标识
   id?: string;
   // 父节点标识
   pid: string;
   // 菜单类型
   type: number;
   // 菜单名
   name: string;
   // 菜单图标
   icon: string;
   // 国际化
   local: string;
   // 路由地址
   path: string;
   // 组件地址
   component: string;
   // 状态
   status: number;
   // 备注
   remark: string;
   // 是否在菜单中隐藏
   hideInMenu: number;
   // 是否在面包屑中隐藏
   hideInBreadcrumb: number;
   // 创建时间
   create_time?: string;
   // 更新时间
   update_time?: string;
   // 子节点
   children?: IMenu[]
 }
}
