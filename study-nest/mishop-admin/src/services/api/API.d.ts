declare namespace APIS {
  /* 认证相关 */
  // token
  type IToken = string;

  // 验证码
  type IFakeCaptchaRes = {
    base64: string;
    uuid: string;
  };

  // 注册
  type IRegisterReq = {
    username: string;
    password: string;
    repassword: string;
  };

  // 登录
  type ILoginReq = {
    username: string;
    password: string;
    captcha: boolean;
  };
  type ILoginRes = {
    token: string;
    userInfo: MODEL.IUser
  };

  /* 用户相关 */
  type IUserGetPageReq = {
    pageSize: number,
    current: number
  }
  type IUserGetPageRes = {
    total: number,
    success: boolean,
    data: MODEL.IUser[]
  }
  type IUserCreateReq = {
    userName: string,
    nickName?: string,
    role: string,
    email?: string,
    phone?: string,
    address?: string,
    status: number
  }

  /* 角色相关 */
  type IRoleGetPageReq = {
    pageNo: number,
    pageSize: number,
    name?: string,
    status?: number,
    create_time?: string
  }
  type IRoleGetPageRes = {
    total: number,
    pageNo: number,
    pageSize: number,
    records: MODEL.IRole[]
  }
  type IRoleCreateReq = {
    name: string,
    status: number,
    remark?: string
  }
  type IRoleUpdateReq = {
    id: string,
    name?: string,
    status?: number,
    remark?: string
  }

  /* 菜单相关 */
  type IMenuCreateReq = {
    pid: string;
    name: string;
    icon?: string;
    status?: number;
    remark?: string;
    hideInMenu?: number;
    hideInBreadcrumb?: number;
  }

  type IMenuUpdateReq = {
    id: string;
    pid: string;
    name?: string;
    icon?: string;
    status?: number;
    remark?: string;
    hideInMenu?: number;
    hideInBreadcrumb?: number;
  }
}
