declare namespace MODEL {
  /* 用户相关 */
  type IUser = {
    id: string;
    userName: string;
    nickName: string;
    password: string;
    avatar: string;
    phone: string;
    address: string
    email: string;
    role: number;
    status: number;
  }

  /* 角色相关 */
  type IRole = {
    id: string;
    name: string;
    status: number;
    remark: string;
    create_time: string;
    update_time: string;
  }
}
