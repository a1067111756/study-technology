/* 标签相关api */
import request from '@/utils/request'

// 获取user下的label标签
export const getListByUserId = params => request(params)

// 更新user下的label标签
export const updateListByUserId = params => request(params)

export default {
	getListByUserId,
  updateListByUserId
}