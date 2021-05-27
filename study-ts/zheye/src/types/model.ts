// 分页查询参数基础接口
export interface IBasePageQueryEntity {
  page: number,
  pageSize: number
}

// 专栏详情
export interface IColumnEntity {
  _id: string,
  title: string,
  author: string,
  description: string,
  avatar: {
    _id?: string,
    url: string
  }
}
