/* 专栏相关 */
import request from '@/utils/request'
import { IGetPageOfColumnResDTO } from '@/types/dto'
import { IBasePageQueryEntity, IColumnEntity } from '@/types/model'

// 分页
export const getPage = (params: IBasePageQueryEntity) => request.get<IGetPageOfColumnResDTO>(`/columns?currentPage=${params.page}&pageSize=${params.pageSize}`)

// 详情
export const getById = (id: string) => request.get<IColumnEntity>(`/columns/${id}`)